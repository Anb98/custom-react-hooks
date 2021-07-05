import * as React from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { globals } from './setGlobals';

export type RequestUseLazyFetch = Omit<AxiosRequestConfig, 'baseURL'>;
export type UseLazyFetchProps<T> = {
    url: string,
    initialData: T,
    request: Omit<RequestUseLazyFetch, 'url'>,
	onSuccess: (data?: T) => void | Promise<void>
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
    statusCode: number,
};

const initialState: Readonly<State<null>> = {
	isSuccess: false,
	isLoading: false,
	isError: false,
	data: null,
	error: null,
	status: 'idle',
	statusCode: 0,
};

type ActionPayload = { data: any, status: number };
type Action = { type: 'FETCH_INIT' }
    | { type: 'FETCH_SUCCESS', payload: ActionPayload }
    | { type: 'FETCH_FAILURE', payload: ActionPayload };

type Reducer<T> = (state: State<T>, action: Action) => State<T>;
const reducer = <T>(state: State<T>, action: Action): State<T> => {
	switch (action.type) {
	case 'FETCH_INIT':
		return {
			...state,
			status: 'pending',
			statusCode: 0,
			isSuccess: false,
			isLoading: true,
			isError: false,
			error: null,
		};
	case 'FETCH_SUCCESS':
		return {
			...state,
			status: 'resolved',
			statusCode: action.payload.status,
			isSuccess: true,
			isLoading: false,
			isError: false,
			data: action.payload.data,
		};
	case 'FETCH_FAILURE':
		return {
			...state,
			status: 'rejected',
			statusCode: action.payload.status,
			isSuccess: false,
			isLoading: false,
			isError: true,
			error: action.payload.data,
		};
	default:
		throw new Error();
	}
};

/**
 * useLazyFetch
 * @param initialSettings
 */
export default <T = any >(props?: Partial<UseLazyFetchProps<T>>) => {
	const {
		initialData = null,
		url: initialUrl = '',
		request: defaultRequest = {},
		onSuccess = () => {},
		onComplete = () => {},
		onFail = () => {},
	} = props || {};

	const defaultWithCredentials = defaultRequest?.withCredentials || globals.withCredentials;

	const [state, dispatch] = React.useReducer<Reducer<T>>(reducer, {
		...initialState,
		data: initialData,
	});

	const fetchData = async (request: RequestUseLazyFetch = {}) => {
		try {
			if (state.isLoading) return;

			const url = request.url || initialUrl;
			request.url = globals.baseURL ? `${globals.baseURL}/${url}` : url;
			request.headers = { ...globals.headers, ...defaultRequest.headers, ...request.headers };
			request.withCredentials = defaultWithCredentials;
			request.method = request.method || defaultRequest.method || 'GET';

			dispatch({ type: 'FETCH_INIT' });
			const { data, status } = await axios(request);

			dispatch({ type: 'FETCH_SUCCESS', payload: { data, status } });
			onSuccess(data);
			onComplete(data, null);
		} catch (error) {
			dispatch({ type: 'FETCH_FAILURE', payload: { data: error, status: error.response?.status } });
			onFail(error);
			onComplete(undefined, error);
		}
	};

	return [state, fetchData] as const;
};
