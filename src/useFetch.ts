import * as React from 'react';
import useLazyFetch, { UseLazyFetchProps, RequestUseLazyFetch } from './useLazyFetch';

export type UseFetchProps<T> = Omit<UseLazyFetchProps<T>, 'url'>;
export type RequestUseFetch = RequestUseLazyFetch;

/**
 * useFetch
 * @param initialSettings
 */
export default <T = any >(url: string, props?: Partial<UseFetchProps<T>>) => {
	const [state, handler] = useLazyFetch({ ...props, url });

	React.useEffect(() => {
		handler(props?.request);
	}, [url]);

	return [state, handler] as const;
};
