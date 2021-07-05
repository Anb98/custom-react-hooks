import * as React from 'react';
import { UseFetchProps } from './useFetch';
import useLazyFetchCache from './useLazyFetchCache';

export default <T = any>(url: string, props?: Partial<UseFetchProps<T>>) => {
	const [state, handler] = useLazyFetchCache({ ...props, url });

	React.useEffect(() => {
		handler({ ...props?.request, url });
	}, [url]);

	return [state, handler] as const;
};
