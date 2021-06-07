import * as React from 'react';
export declare type Properties<T> = Array<keyof T>;
export declare type Props<T> = {
    allowFields?: Properties<T>;
    denyFields?: Properties<T>;
};
declare const useSearch: <T>(props?: Props<T>) => {
    filtered: T[];
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    setSourceData: React.Dispatch<React.SetStateAction<T[]>>;
    sourceData: T[];
};
export default useSearch;
