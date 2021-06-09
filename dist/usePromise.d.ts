export declare type UsePromise<T> = {
    promise: Promise<T>;
    onSuccess?: (data?: T) => void;
    onFail?: (err?: any) => void;
    onComplete?: (data?: T, err?: any) => void;
};
export declare type State<T> = {
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
    data: T | null;
    error: any;
    status: 'idle' | 'pending' | 'resolved' | 'rejected';
};
declare const _default: <T = any>(props: UsePromise<T>) => readonly [State<T>, () => Promise<void>];
export default _default;
