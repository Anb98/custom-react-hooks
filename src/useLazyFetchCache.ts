import * as React from 'react';
import useLazyFetch, { UseLazyFetchProps, RequestUseLazyFetch } from './useLazyFetch';
import { CacheContext } from './CacheContext';

type Refresh = { refresh?: boolean };

type VerifyCache = (request?: RequestUseLazyFetch, options?: Refresh) => void;

/**
 * This hooks allow to cache results from request previously fetched.
 * To use this hooks you first need to implement CacheProvider.
 * @param {string} url URL to request
 * @param props Initial options
 * @example
 * ```
const [state, fetchHandler, resetState ] = useLazyFetchCache({
    url: 'your-endpoint-url',
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

	const [stateApi, fetchData, resetState, cancelFetch] = useLazyFetch({ ...props, onSuccess: setCache });
	const [state, setState] = React.useState(stateApi);

	React.useEffect(() => { setState(stateApi); }, [stateApi]);

	const verifyCache: VerifyCache = (request?: RequestUseLazyFetch, { refresh }: Refresh = {}) => {
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

	return [{ ...state, data: resultCache }, verifyCache, resetState, cancelFetch] as const;
};

export default useLazyFetchCache;
