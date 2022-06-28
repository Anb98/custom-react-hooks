import * as React from 'react';

type DependencyList = ReadonlyArray<any>;

export type UsePromiseOptions<Params, Result> = {
    initialData: Result,
	deps: DependencyList
	params: Params,
	onComplete: (data?: Result, err?: any) => void | Promise<void>,
	onFail: (err?: any) => void | Promise<void>,
	onSuccess: (data?: Result) => void | Promise<void>,
	onUnmount: () => void,
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
			data: null,
			error: null,
			isError: false,
			isLoading: true,
			isSuccess: false,
			status: 'pending',
		};
	case 'PROMISE_SUCCESS':
		return {
			data: action.payload,
			error: null,
			isError: false,
			isLoading: false,
			isSuccess: true,
			status: 'resolved',
		};
	case 'PROMISE_FAILURE':
		return {
			data: null,
			error: action.payload,
			isError: true,
			isLoading: false,
			isSuccess: false,
			status: 'rejected',
		};
	default:
		throw new Error();
	}
};

/**
 * This hook executes a Promise when calling the promiseHandler function.
 * @param promise Promise function to handle
 * @param options Initial options
 * @returns [state, promiseHandler, resetState]
 * @example
 * ```
const [state, promiseHandler, resetState ] = usePromise(promise, {
    deps:[],
    params: [],
    initialData: {},
    onComplete: (data, err) => {},
    onFail: (err) => {},
    onSuccess: (data) => {},
    onUnmount: () => {},
});
 *```
 * @see https://www.npmjs.com/package/@anb98/react-hooks#usePromise
 */
const usePromise = <PromiseFunction extends (...params: [] | any[]) => Promise<any>>(
	promise: PromiseFunction,
	options?: Partial<UsePromiseOptions<Parameters<PromiseFunction>, Awaited<ReturnType<PromiseFunction>>>>,
) => {
	const {
		initialData = null,
		onSuccess = () => {},
		onComplete = () => {},
		onFail = () => {},
		onUnmount = ()=>{},
		deps,
		params,
	} = options || {};

	const [state, dispatch] = React.useReducer<Reducer<Awaited<ReturnType<PromiseFunction>>>>(reducer, {
		...initialState,
		data: initialData,
	});

	const resetState = () => dispatch({ type: 'PROMISE_IDLE' });

	const promiseHandler = async (...promiseParams: [] | Parameters<PromiseFunction> ) => {
		try {
			const localParams = promiseParams.length ? promiseParams : params;

			if (state.isLoading) return;

			dispatch({ type: 'PROMISE_INIT' });
			const data = await promise( ...localParams);

			dispatch({ type: 'PROMISE_SUCCESS', payload: data });
			onSuccess(data);
			onComplete(data, null);
		} catch (error) {
			dispatch({ type: 'PROMISE_FAILURE', payload: error });
			onFail(error);
			onComplete(undefined, error);
		}
	};

	React.useEffect(() => { 
		if (deps) { promiseHandler(); } 

		return onUnmount;
	}, deps || []);

	return [state, promiseHandler, resetState] as const;
};

export default usePromise;
