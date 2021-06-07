import { UseLazyFetchProps, RequestUseLazyFetch } from './useLazyFetch';
export declare type UseFetchProps<T> = UseLazyFetchProps<T>;
export declare type RequestUseFetch = RequestUseLazyFetch;
declare const _default: <T = any>(props?: Partial<UseFetchProps<T>> | undefined) => readonly [import("./useLazyFetch").State<T>, (request?: RequestUseLazyFetch) => Promise<void>];
/**
 * useFetch
 * @param initialSettings
 */
export default _default;
