import { UseDataApiProps, Request } from './useDataApi';
declare type Refresh = {
    refresh?: boolean;
};
declare type Props<T> = UseDataApiProps<T> & Refresh;
declare const _default: <T = any>(props?: Partial<Props<T>> | undefined) => readonly [{
    readonly data: null;
    readonly isSuccess: boolean;
    readonly isLoading: boolean;
    readonly isError: boolean;
    readonly error: any;
    readonly status: number;
}, (request?: Request | undefined, { refresh }?: Refresh) => void];
export default _default;
