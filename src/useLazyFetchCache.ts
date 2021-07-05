import * as React from 'react';
import useLazyFetch, { UseLazyFetchProps, RequestUseLazyFetch } from './useLazyFetch';
import { CacheContext } from './CacheContext';

type Refresh = { refresh?: boolean };

export default <T = any>(props?: Partial<UseLazyFetchProps<T>>) => {
	const { onSuccess = () => {} } = props || {};
	const { state: stateCache, setResult } = React.useContext(CacheContext);
	const [stringRequest, setStringRequest] = React.useState('');
	const [resultCache, setResultCache] = React.useState(props?.initialData);

	const setCache = (data: T) => {
		setResult(stringRequest, data);
		setResultCache(data);
		onSuccess(data);
	};

	const [stateApi, fetchData] = useLazyFetch({ ...props, onSuccess: setCache });

	const verifyCache = (request?: RequestUseLazyFetch, { refresh }: Refresh = {}) => {
		const stringifyRequest: string = JSON.stringify(request || {
			...props?.request,
			url: props?.url,
		});

		if (!refresh && stateCache[stringifyRequest]) {
			setResultCache(stateCache[stringifyRequest]);
		} else {
			setStringRequest(stringifyRequest);
			fetchData(request);
		}
	};

	return [{ ...stateApi, data: resultCache }, verifyCache] as const;
};
