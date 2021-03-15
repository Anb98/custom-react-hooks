import * as React from 'react';
import useDataApi, { UseDataApiProps, Request } from './useDataApi';
import { CacheContext } from './CacheContext';

type Refresh = {refresh?: boolean};
type Props<T> = UseDataApiProps<T> & Refresh;

export default <T = any>(props?: Partial<Props<T>>)=>{
    const { refresh: initialRefresh = false, onSuccess = ()=>{} } = props || {};
    const { state: stateCache, setResult } = React.useContext(CacheContext);
    const [ stringRequest, setStringRequest ] = React.useState('');
    const [ resultCache, setResultCache ] = React.useState(null);

    const setCache = (data: any) => {
        setResult(stringRequest, data);
        setResultCache(data);
        onSuccess(data);
    };

    const [stateApi, fetchData] = useDataApi({...props, lazy: true, onSuccess: setCache});

    const verifyCache = (request?: Request, { refresh }: Refresh = {})=>{
        const stringRequest: string = JSON.stringify(request);

        if(!refresh && stateCache[stringRequest]){
            setResultCache(stateCache[stringRequest]);
        }else{
            setStringRequest(stringRequest);
            fetchData(request);
        }
    };

    React.useEffect(()=>{
        if(!props?.lazy){
            verifyCache( props?.request, { refresh: initialRefresh });
        }
    },[]);

    return [{ ...stateApi, data:resultCache }, verifyCache] as const;
}