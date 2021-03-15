import * as React from 'react';
declare type Context = {
    state: object;
    setResult: (objectRequest: string, result: any) => void;
};
export declare const CacheContext: React.Context<Context>;
declare type Props = {
    children: React.ReactNode;
};
declare const _default: ({ children }: Props) => JSX.Element;
export default _default;
