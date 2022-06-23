import * as React from 'react';
import useLazyFetch, { UseLazyFetchProps, RequestUseLazyFetch } from './useLazyFetch';

type DependencyList = ReadonlyArray<any>;

export type UseFetchProps<T> = Omit<UseLazyFetchProps<T>, 'url'> & { deps: DependencyList };
export type RequestUseFetch = RequestUseLazyFetch;

/**
 * This hook consumes API when component is mounted and also when calling the fetchHandler function.
By default it request with GET method unless you change initial options.
 * @param {string} url URL to request
 * @param props Initial options
 * @example
 * ```
const [state, fetchHandler, resetState ] = useFetch('your-endpoint-url', {
    deps: [],
    initialData: {},
    request: { headers: { example: 'test'} }
    onCancel: () => {},
    onComplete: (data, err) => {},
    onFail: (err) => {},
    onSuccess: (data) => {},
});
 * ```
 * @see https://www.npmjs.com/package/@anb98/react-hooks#useFetch
 */
const useFetch = <T = any >(url: string, props?: Partial<UseFetchProps<T>>) => {
	const { deps = [] } = props || {};
	const [state, fetchHandler, resetState, cancelFetch] = useLazyFetch({ ...props, url });

	React.useEffect(() => {
		fetchHandler(props?.request);
	}, [url, ...deps]);

	return [state, fetchHandler, resetState, cancelFetch] as const;
};

export default useFetch;
