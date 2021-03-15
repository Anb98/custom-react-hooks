interface Globals {
    baseURL: string;
    headers: any;
    withCredentials: boolean;
}
export declare const globals: Globals;
declare const _default: ({ baseURL, headers, withCredentials }: Partial<Globals>) => Globals & {
    baseURL: string;
    headers: any;
    withCredentials: boolean;
};
export default _default;
