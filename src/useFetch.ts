import * as React from 'react';
import useLazyFetch, {UseLazyFetchProps, RequestUseLazyFetch} from './useLazyFetch';

export type UseFetchProps<T> = UseLazyFetchProps<T>;
export type RequestUseFetch = RequestUseLazyFetch;

/**
 * useFetch
 * @param initialSettings
 */
export default <T = any >(props?: Partial<UseFetchProps<T>>) => {
    const [state, handler] = useLazyFetch(props);

    React.useEffect(()=>{
        handler(props?.request);
    }, []);

    return [state, handler] as const;
}