import axios, { AxiosRequestConfig } from 'axios';
import usePromise, { UsePromise } from './usePromise';
import { globals } from './setGlobals';

export type RequestUseLazyFetch = Omit<AxiosRequestConfig, 'baseURL'>;
export type UseLazyFetchProps<T> = {
    url: string,
    request: Omit<RequestUseLazyFetch, 'url'>,
} & Omit<UsePromise<T, { xd:string }>, 'deps' | 'params'>;

/**
 * useLazyFetch
 * @param props Initial options
 * @returns [state, fetchData, resetState]
 */
const useLazyFetch = <T = any >(props?: Partial<UseLazyFetchProps<T>>) => {
	const {
		url: initialUrl = '',
		request: defaultRequest = {},
	} = props || {};

	const promise = async (request: RequestUseLazyFetch = {}) => {
		const defaultWithCredentials = defaultRequest?.withCredentials || globals.withCredentials;
		const url = request.url || initialUrl;
		request.url = globals.baseURL ? `${globals.baseURL}/${url}` : url;
		request.headers = { ...globals.headers, ...defaultRequest.headers, ...request.headers };
		request.withCredentials = defaultWithCredentials;
		request.method = request.method || defaultRequest.method || 'GET';

		return axios(request).then(({ data }) => data);
	};

	const [state, fetchData, resetState] = usePromise<T, RequestUseLazyFetch>(promise, props);

	return [state, fetchData, resetState] as const;
};

export default useLazyFetch;
