import * as React from 'react';
import { globals } from './setGlobals';
import axios, { AxiosRequestConfig } from 'axios';

export type RequestUseLazyFetch = Omit<AxiosRequestConfig, 'baseURL'>;
export type UseLazyFetchProps<T> = {
    url: string,
    request: Omit<RequestUseLazyFetch, 'url'>,
	onSuccess: (data?: T) => void,
	onFail: (err?: any) => void,
	onComplete: (data?: T, err?: any) => void,
}

export type State<T> = {
    isSuccess: boolean,
    isLoading: boolean,
    isError: boolean,
    data: T | null,
    error: any,
    status: number
};

const initialState: Readonly<State<null>> = {
    isSuccess: false,
    isLoading: false,
    isError: false,
    data: null,
    error: null,
    status: 0,
}

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
			status: 0,
			isSuccess: false,
			isLoading: true,
			isError: false,
			error: null,
			data: null,
		};
	case 'FETCH_SUCCESS':
		return {
			...state,
			status: action.payload.status,
			isSuccess: true,
			isLoading: false,
			isError: false,
			data: action.payload.data,
		};
	case 'FETCH_FAILURE':
		return {
			...state,
			status: action.payload.status,
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
        url: initialUrl = '',
        request: defaultRequest = {},
        onSuccess = ()=>{},
        onComplete = ()=>{},
        onFail = ()=>{},
    } = props || {};

    const defaultWithCredentials = defaultRequest?.withCredentials || globals.withCredentials;

    const [state, dispatch] = React.useReducer<Reducer<T>>(reducer, initialState);

    const fetchData = async (request: RequestUseLazyFetch = {}) => {
        try {
            if(state.isLoading) return;

            const url = request.url || initialUrl;
            request.url = globals.baseURL ? `${ globals.baseURL }/${url}`: url;
            request.headers = { ...globals.headers, ...defaultRequest.headers,  ...request.headers};
            request.withCredentials = defaultWithCredentials
            request.method = request.method || defaultRequest.method || 'GET';

            dispatch({type: 'FETCH_INIT'});
            const { data, status } = await axios(request)
            
            dispatch({ type: 'FETCH_SUCCESS', payload: { data, status }});
            onSuccess(data);
            onComplete(data, null);
        } catch (error) {
            dispatch({ type:  'FETCH_FAILURE', payload: { data: error, status: error.response?.status }})
            onFail(error);
            onComplete(undefined, error);
        }
    }

    return [state, fetchData] as const;
}