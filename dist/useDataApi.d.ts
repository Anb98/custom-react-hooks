import { AxiosRequestConfig } from 'axios';
export declare type Request = Omit<AxiosRequestConfig, 'baseURL'>;
export declare type UseDataApiProps<T> = {
    url: string;
    request: Omit<Request, 'url'>;
    lazy: boolean;
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
declare const _default: <T = any>(props?: Partial<UseDataApiProps<T>> | undefined) => readonly [State<T>, (request?: Request) => Promise<void>];
/**
 * useDataApi
 * @param initialSettings
 */
export default _default;
