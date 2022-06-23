import * as React from 'react';
import { UseFetchProps } from './useFetch';
import useLazyFetchCache from './useLazyFetchCache';

/**
 * This hooks allow to cache results from request previously fetched.
 * To use this hooks you first need to implement CacheProvider.
 * @param {string} url URL to request
 * @param props Initial options
 * @example
 * ```
const [state, fetchHandler, resetState ] = useFetchCache('your-endpoint-url', {
    deps: [],
    initialData: {},
    request: { headers: { example: 'test'} }
    onCancel: () => {},
    onComplete: (data, err) => {},
    onFail: (err) => {},
    onSuccess: (data) => {},
});
 * ```
 * @see https://www.npmjs.com/package/@anb98/react-hooks#useFetchCache-and-useLazyFetchCache
 */
const useFetchCache = <T = any>(url: string, props?: Partial<UseFetchProps<T>>) => {
	const { deps = [] } = props || {};
	const [state, fetchHandler, resetState, cancelFetch] = useLazyFetchCache({ ...props, url });

	React.useEffect(() => {
		fetchHandler({ ...props?.request, url });
	}, [url, ...deps]);

	return [state, fetchHandler, resetState, cancelFetch] as const;
};

export default useFetchCache;
