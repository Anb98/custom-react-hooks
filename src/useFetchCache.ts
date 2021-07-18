import * as React from 'react';
import { UseFetchProps } from './useFetch';
import useLazyFetchCache from './useLazyFetchCache';

const useFetchCache = <T = any>(url: string, props?: Partial<UseFetchProps<T>>) => {
	const { deps = [] } = props || {};
	const [state, handler] = useLazyFetchCache({ ...props, url });

	React.useEffect(() => {
		handler({ ...props?.request, url });
	}, [url, ...deps]);

	return [state, handler] as const;
};

export default useFetchCache;
