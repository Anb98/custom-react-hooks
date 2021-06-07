import { UseLazyFetchProps, RequestUseLazyFetch } from './useLazyFetch';
declare type Refresh = {
    refresh?: boolean;
};
declare const _default: <T = any>(props?: Partial<UseLazyFetchProps<T>> | undefined) => readonly [{
    readonly data: null;
    readonly isSuccess: boolean;
    readonly isLoading: boolean;
    readonly isError: boolean;
    readonly error: any;
    readonly status: number;
}, (request?: RequestUseLazyFetch | undefined, { refresh }?: Refresh) => void];
export default _default;
