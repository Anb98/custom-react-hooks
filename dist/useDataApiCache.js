// import * as React from 'react';
// import useFetch, { UseFetchProps, Request } from './useFetch';
// import { CacheContext } from './CacheContext';
// type Refresh = {refresh?: boolean};
// type Props<T> = UseFetchProps<T> & Refresh;
// export default <T = any>(props?: Partial<Props<T>>)=>{
//     const { refresh: initialRefresh = false, onSuccess = ()=>{} } = props || {};
//     const { state: stateCache, setResult } = React.useContext(CacheContext);
//     const [ stringRequest, setStringRequest ] = React.useState('');
//     const [ resultCache, setResultCache ] = React.useState(null);
//     const setCache = (data: any) => {
//         setResult(stringRequest, data);
//         setResultCache(data);
//         onSuccess(data);
//     };
//     const [stateApi, fetchData] = useFetch({...props, onSuccess: setCache});
//     const verifyCache = (request?: Request, { refresh }: Refresh = {})=>{
//         const stringRequest: string = JSON.stringify(request);
//         if(!refresh && stateCache[stringRequest]){
//             setResultCache(stateCache[stringRequest]);
//         }else{
//             setStringRequest(stringRequest);
//             fetchData(request);
//         }
//     };
//     // React.useEffect(()=>{
//     //     if(!props?.lazy){
//     //         verifyCache( props?.request, { refresh: initialRefresh });
//     //     }
//     // },[]);
//     return [{ ...stateApi, data:resultCache }, verifyCache] as const;
// }
export default (function () { });
//# sourceMappingURL=useDataApiCache.js.map