import * as React from 'react';

import axios, { AxiosRequestConfig } from 'axios';
import usePromise, { UsePromiseOptions } from './usePromise';
import { globals } from './setGlobals';

export type RequestUseLazyFetch = Omit<AxiosRequestConfig, 'baseURL'>;
export type UseLazyFetchProps<Response> = {
    url: string,
    request: Omit<RequestUseLazyFetch, 'url'>,
} 
& Omit<UsePromiseOptions<RequestUseLazyFetch, Response>, 'params' | 'onUnmount'>
& { onCancel: ()=> void };

/**
 * This hook consumes an API when calling the handler function.
 * @param props Initial options
 * @returns [state, handler, resetState, cancelFetch]
 * @example
 * ```
const [state, handler, resetState, cancelFetch ] = useLazyFetch({
    url: 'your-endpoint-url',
    initialData: {},
    request: { headers: { example: 'test'} }
	onCancel: () => {},
    onComplete: (data, err) => {},
    onFail: (err) => {},
    onSuccess: (data) => {},
});
```
 * @see https://www.npmjs.com/package/@anb98/react-hooks#useLazyFetch
 */
const useLazyFetch = <Response = any >(props?: Partial<UseLazyFetchProps<Response>>) => {
	const controller = React.useRef<AbortController>();

	const {
		url: initialUrl = '',
		request: defaultRequest = {},
		onCancel = () => {},
		onComplete = () => {},
	} = props || {};

	const promise = (request: RequestUseLazyFetch = {}): Promise<Response> => {
		controller.current = new AbortController();

		const defaultWithCredentials = defaultRequest?.withCredentials || globals.withCredentials;
		const url = request.url || initialUrl;
		request.url = globals.baseURL ? `${globals.baseURL}/${url}` : url;
		request.headers = { ...globals.headers, ...defaultRequest.headers, ...request.headers };
		request.withCredentials = defaultWithCredentials;
		request.method = request.method || defaultRequest.method || 'GET';
		request.signal = controller.current.signal;

		return axios(request).then(({ data }) => data);
	};

	const cancelFetch = ()=>{
		if (controller.current) {
			controller.current.abort();
			onCancel();
		}
	};

	const [state, fetchData, resetState] = usePromise(promise, { 
		...props,
		initialData: props?.initialData as Awaited<Response>,
		onUnmount: cancelFetch,
		onComplete(data, err) {
			controller.current = undefined;
			onComplete(data, err);
		},
	});

	return [state, fetchData, resetState, cancelFetch ] as const;
};

export default useLazyFetch;
