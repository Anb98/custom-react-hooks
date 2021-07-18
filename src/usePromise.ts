import * as React from 'react';

type DependencyList = ReadonlyArray<any>;

export type UsePromise<T, U> = {
    initialData: T,
	deps: DependencyList
	params: U,
	onSuccess: (data?: T) => void | Promise<void>,
	onFail: (err?: any) => void | Promise<void>,
	onComplete: (data?: T, err?: any) => void | Promise<void>,
};

export type State<T> = {
    isSuccess: boolean,
    isLoading: boolean,
    isError: boolean,
    data: T | null,
    error: any,
    status: 'idle' | 'pending' | 'resolved' | 'rejected',
};

const initialState: Readonly<State<null>> = {
	isSuccess: false,
	isLoading: false,
	isError: false,
	data: null,
	error: null,
	status: 'idle',
};

type Action = { type: 'FETCH_INIT' }
    | { type: 'FETCH_SUCCESS', payload: any }
    | { type: 'FETCH_FAILURE', payload: any };

type Reducer<T> = (state: State<T>, action: Action) => State<T>;
const reducer = <T>(state: State<T>, action: Action): State<T> => {
	switch (action.type) {
	case 'FETCH_INIT':
		return {
			...state,
			status: 'pending',
			isSuccess: false,
			isLoading: true,
			isError: false,
			error: null,
		};
	case 'FETCH_SUCCESS':
		return {
			...state,
			status: 'resolved',
			isSuccess: true,
			isLoading: false,
			isError: false,
			data: action.payload,
		};
	case 'FETCH_FAILURE':
		return {
			...state,
			status: 'rejected',
			isSuccess: false,
			isLoading: false,
			isError: true,
			error: action.payload,
		};
	default:
		throw new Error();
	}
};

const usePromise = <T = any, U = any>(
	promise: (params?: U)=>Promise<T>,
	props?: Partial<UsePromise<T, U>>,
) => {
	const {
		initialData = null,
		onSuccess = () => {},
		onComplete = () => {},
		onFail = () => {},
		deps,
		params,
	} = props || {};

	const [state, dispatch] = React.useReducer<Reducer<T>>(reducer, {
		...initialState,
		data: initialData,
	});

	const handlePromise = async (promiseParams = params) => {
		try {
			if (state.isLoading) return;

			dispatch({ type: 'FETCH_INIT' });
			const data = await promise(promiseParams);

			dispatch({ type: 'FETCH_SUCCESS', payload: data });
			onSuccess(data);
			onComplete(data, null);
		} catch (error) {
			dispatch({ type: 'FETCH_FAILURE', payload: error });
			onFail(error);
			onComplete(undefined, error);
		}
	};

	React.useEffect(() => { if (deps) { handlePromise(params); } }, deps);

	return [state, handlePromise] as const;
};

export default usePromise;
