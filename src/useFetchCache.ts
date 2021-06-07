import * as React from 'react';
import { UseLazyFetchProps } from './useLazyFetch';
import useLazyFetchCache from './useLazyFetchCache';

export default <T = any>(props?: Partial<UseLazyFetchProps<T>>)=>{
    const [state, handler ] = useLazyFetchCache(props);

    React.useEffect(()=>{
        handler(props?.request)
    },[]);

    return [state, handler] as const;
};