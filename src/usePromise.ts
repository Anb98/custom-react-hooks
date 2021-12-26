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

type Action = { type: 'PROMISE_INIT' }
	| { type: 'PROMISE_IDLE' }
    | { type: 'PROMISE_SUCCESS', payload: any }
    | { type: 'PROMISE_FAILURE', payload: any };

type Reducer<T> = (state: State<T>, action: Action) => State<T>;
const reducer = <T>(state: State<T>, action: Action): State<T> => {
	switch (action.type) {
	case 'PROMISE_IDLE':
		return initialState;
	case 'PROMISE_INIT':
		return {
			...state,
			status: 'pending',
			isSuccess: false,
			isLoading: true,
			isError: false,
			error: null,
		};
	case 'PROMISE_SUCCESS':
		return {
			...state,
			status: 'resolved',
			isSuccess: true,
			isLoading: false,
			isError: false,
			data: action.payload,
		};
	case 'PROMISE_FAILURE':
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

/**
 * usePromise
 * @param promise Promise function to handle
 * @param props Initial options
 * @returns [state, handlePromise, resetState]
 */
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

	/**
	 * handlePromise executes a Promise
	 */
	const handlePromise = async (promiseParams = params) => {
		try {
			if (state.isLoading) return;

			dispatch({ type: 'PROMISE_INIT' });
			const data = await promise(promiseParams);

			dispatch({ type: 'PROMISE_SUCCESS', payload: data });
			onSuccess(data);
			onComplete(data, null);
		} catch (error) {
			dispatch({ type: 'PROMISE_FAILURE', payload: error });
			onFail(error);
			onComplete(undefined, error);
		}
	};

	/**
	 * resetState function will reset returned state to initial state.
	 */
	const resetState = () => dispatch({ type: 'PROMISE_IDLE' });

	React.useEffect(() => { if (deps) { handlePromise(params); } }, deps);

	return [state, handlePromise, resetState] as const;
};

export default usePromise;
