/**
 * Callback called when request succeeds
 * @param data - Result from request
 */
declare type onSuccess = (data: any) => void;

/**
 * Callback called when request fails
 * @param error - Error from request
 */
declare type onFail = (error: any) => void;

/**
 * Callback called when request completes
 * @param data - Result from request
 * @param error - Error from request
 */
declare type onComplete = (data: any, error: any) => void;

/**
 * Request state
 * @property isLoading - Loading
 * @property isError - Request has failed
 * @property isSuccess - Request has succeed
 * @property status - State from request
 * @property data - Result from request
 * @property error - Error from request
 */
declare type state = {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    status: boolean;
    data: any;
    error: any;
};

/**
 * Initial settings
 * @property [url] - Initial URL to request
 * @property [headers] - Header request
 * @property [onSuccess] - Callback called when request succeeds
 * @property [onFail] - Callback called when request fails
 * @property [onComplete] - Callback called when request completes
 */
declare type initialSettings = {
    url?: string;
    headers?: any;
    onSuccess?: onSuccess;
    onFail?: onFail;
    onComplete?: onComplete;
};

/**
 * Params
 * @property [body] - Body request
 * @property [method = get] - HTTP method
 * @property [params] - Params request
 * @property [url] - URL to request
 */
declare type fetchDataParams = {
    body?: any;
    method?: string;
    params?: any;
    url?: string;
    withCredentials?: boolean;
};

declare type fetchData = { (params?: fetchDataParams): void }

/**
 * useDataApi
 * @param [initialSettings] - Initial settings
 */
declare function useDataApi(initialSettings?: initialSettings): [state, fetchData];

export default useDataApi;