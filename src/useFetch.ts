import * as React from 'react';
import useLazyFetch, { UseLazyFetchProps, RequestUseLazyFetch } from './useLazyFetch';

type DependencyList = ReadonlyArray<any>;

export type UseFetchProps<T> = Omit<UseLazyFetchProps<T>, 'url'> & { deps: DependencyList };
export type RequestUseFetch = RequestUseLazyFetch;

/**
 * useFetch
 * @param initialSettings
 */
const useFetch = <T = any >(url: string, props?: Partial<UseFetchProps<T>>) => {
	const { deps = [] } = props || {};
	const [state, handler] = useLazyFetch({ ...props, url });

	React.useEffect(() => {
		handler(props?.request);
	}, [url, ...deps]);

	return [state, handler] as const;
};

export default useFetch;
