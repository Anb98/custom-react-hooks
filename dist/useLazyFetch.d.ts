import { AxiosRequestConfig } from 'axios';
export declare type RequestUseLazyFetch = Omit<AxiosRequestConfig, 'baseURL'>;
export declare type UseLazyFetchProps<T> = {
    url: string;
    request: Omit<RequestUseLazyFetch, 'url'>;
    onSuccess: (data?: T) => void;
    onFail: (err?: any) => void;
    onComplete: (data?: T, err?: any) => void;
};
export declare type State<T> = {
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
    data: T | null;
    error: any;
    status: number;
};
declare const _default: <T = any>(props?: Partial<UseLazyFetchProps<T>> | undefined) => readonly [State<T>, (request?: RequestUseLazyFetch) => Promise<void>];
/**
 * useLazyFetch
 * @param initialSettings
 */
export default _default;
