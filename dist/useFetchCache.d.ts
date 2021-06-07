import { UseLazyFetchProps } from './useLazyFetch';
declare const _default: <T = any>(props?: Partial<UseLazyFetchProps<T>> | undefined) => readonly [{
    readonly data: null;
    readonly isSuccess: boolean;
    readonly isLoading: boolean;
    readonly isError: boolean;
    readonly error: any;
    readonly status: number;
}, (request?: import("./useLazyFetch").RequestUseLazyFetch | undefined, { refresh }?: {
    refresh?: boolean | undefined;
}) => void];
export default _default;
