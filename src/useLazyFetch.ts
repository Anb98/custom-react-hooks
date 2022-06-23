import axios, { AxiosRequestConfig } from 'axios';
import usePromise, { UsePromise } from './usePromise';
import { globals } from './setGlobals';

export type RequestUseLazyFetch = Omit<AxiosRequestConfig, 'baseURL'>;
export type UseLazyFetchProps<T> = {
    url: string,
    request: Omit<RequestUseLazyFetch, 'url'>,
} & Omit<UsePromise<T, RequestUseLazyFetch>, 'deps' | 'params'>;

/**
 * This hook consumes an API when calling the handler function.
 * @param props Initial options
 * @returns [state, handler, resetState]
 * @example
 * ```
const [state, handler, resetState ] = useLazyFetch({
    url: 'your-endpoint-url',
    initialData: {},
    request: { headers: { example: 'test'} }
    onFail: (err) => {},
    onSuccess: (data) => {},
    onComplete: (data, err) => {},
});
```
 * @see https://www.npmjs.com/package/@anb98/react-hooks#useLazyFetch
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
