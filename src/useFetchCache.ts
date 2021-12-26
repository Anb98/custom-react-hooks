import * as React from 'react';
import { UseFetchProps } from './useFetch';
import useLazyFetchCache from './useLazyFetchCache';

/**
 * useFetchCache
 * @param props Initial options
 * @returns [state, fetchData, resetState]
 */
const useFetchCache = <T = any>(url: string, props?: Partial<UseFetchProps<T>>) => {
	const { deps = [] } = props || {};
	const [state, fetchData, resetState] = useLazyFetchCache({ ...props, url });

	React.useEffect(() => {
		fetchData({ ...props?.request, url });
	}, [url, ...deps]);

	return [state, fetchData, resetState] as const;
};

export default useFetchCache;
