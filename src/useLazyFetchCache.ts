import * as React from 'react';
import useLazyFetch, { UseLazyFetchProps, RequestUseLazyFetch } from './useLazyFetch';
import { CacheContext } from './CacheContext';

type Refresh = { refresh?: boolean };

const useLazyFetchCache = <T = any>(props?: Partial<UseLazyFetchProps<T>>) => {
	const { onSuccess = () => {}, onComplete = () => {} } = props || {};
	const { result: stateCache, setResult } = React.useContext(CacheContext);
	const stringRequest = React.useRef('');
	const [resultCache, setResultCache] = React.useState(props?.initialData);

	const setCache = (data: T) => {
		setResult(stringRequest.current, data);
		setResultCache(data);
		onSuccess(data);
	};

	const [stateApi, fetchData] = useLazyFetch({ ...props, onSuccess: setCache });
	const [state, setState] = React.useState(stateApi);

	React.useEffect(() => { setState(stateApi); }, [stateApi]);

	const verifyCache = (request?: RequestUseLazyFetch, { refresh }: Refresh = {}) => {
		const stringifyRequest: string = JSON.stringify(request || {
			...props?.request,
			url: props?.url,
		});

		if (!refresh && stateCache[stringifyRequest]) {
			setResultCache(stateCache[stringifyRequest]);
			setState((prev) => ({ ...prev, status: 'resolved', isSuccess: true }));
			onSuccess(stateCache[stringifyRequest]);
			onComplete(stateCache[stringifyRequest], null);
		} else {
			stringRequest.current = stringifyRequest;
			fetchData(request);
		}
	};

	return [{ ...state, data: resultCache }, verifyCache] as const;
};

export default useLazyFetchCache;
