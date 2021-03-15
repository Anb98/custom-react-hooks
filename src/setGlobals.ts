interface Globals {
    baseURL: string,
    headers: any,
    withCredentials: boolean,
}

export const globals: Globals = {
    baseURL: '',
    headers: null,
    withCredentials: false,
};

export default ({
    baseURL = globals.baseURL,
    headers = globals.headers,
    withCredentials = globals.withCredentials
}: Partial<Globals>) => Object.assign(globals, { baseURL, headers, withCredentials});
