# Hooks

## Table of Contents
* [Installation](#Installation)
* [setGlobals](#setGlobals)
* [useLazyFetch](#useLazyFetch)
* [useFetch](#useFetch)
* [usePromise](#usePromise)
* [useFetchCache and useLazyFetchCache](#useFetchCache-and-useLazyFetchCache)
* [useSearch](#useSearch)
## Installation
```cmd
npm i @anb98/react-hooks
```

## setGlobals
This function allows you to set globals options for `useFetch`, `useFetchData`, `useLazyFetch` and `useLazyFetchCache`

### Usage
```js
import { setGlobals } from '@anb98/react-hooks';

setGlobals({
    baseURL: 'http://your-base-url',
    headers: {},
    withCredentials: true,
})
```

> *You don't need to set `/` at the end of `baseURL`

### setGlobals options
|Property|Description|Type|Default|
|-|-|-|-|
| baseURL | It sets base url to be concatenate with url of useDataApi options | `string` | `''` |
| headers | Request headers |  `any` | `null` |
| withCredentials | Enable cookie credentials | `boolean` | `false` |


## useLazyFetch
This hook consumes API when calling the handler function.

### Usage
```js
import { useLazyFetch } from '@anb98/react-hooks';

const options = {
    url: 'http://your-endpoint-url',
    initialData: {},
    request: { headers: { example: 'test'} }
    onFail: (err) => {},
    onSuccess: (data) => {},
    onComplete: (data, err) => {},
};

const TestComponent = () => {
    const [{ 
        data,
        error,
        isError,
        isLoading,
        isSuccess,
        status,
        statusCode,
    }, handler ] = useLazyFetch(options);
    
    const getData = () => {
        const handlerOptions = {
            body:{},
            headers: {},
            method: 'post',
            params: {},
            url: '',
            withCredentials: true
        }

        handler(handlerOptions);
    };

    return (<button onClick={getData}>test</button>);
};

export default TestComponent;
```

### Initial options
|Property|Description|Type|Default|
|-|-|-|-|
| url | Initial URL to request | `string` | `globals.baseURL` |
| initialData | Initial data to return as result | `any` | `null` |
| request | Request config object axios | [`Request config axios`](https://github.com/axios/axios#request-config) | `{}` |
| onFail | Callback called when request fails | `function(err)`| `()=>{}` |
| onSuccess | Callback called when request fails | `function(data)` | `()=>{}` |
| onComplete | Callback called when request completes | `function(data, err)` | `()=>{}` |

### Returned state
|Property|Description|Type|Default|
|-|-|-|-|
| data | Result of the request | `any` | `initialData` |
| error | Error of the request | `any` | `null` |
| isError | It shows if the request fails | `boolean` | `false` |
| isLoading | It shows if the request is loading | `boolean` | `false` |
| isSuccess | It shows if the request completed successfully | `boolean` | `false` |
| status | It shows the request's status | `idle` \| `pending` \| `resolved` \| `rejected` | `idle` |
| statusCode | It shows the request status code | `number` | `0` |

> `handlerOptions` options uses type [Request config from axios](https://github.com/axios/axios#request-config)
## useFetch
This hook consumes API when component is mounted and also when calling the handler function.

By default it request with `GET` method unless you change `initial options`.

This hook is a wrapper for [`useLazyFetch`](#useLazyFetch).


### Usage
```js
import { useFetch } from '@anb98/react-hooks';

const options = {
    initialData: {},
    request: { headers: { example: 'test'} }
    onFail: (err) => {},
    onSuccess: (data) => {},
    onComplete: (data, err) => {},
};

const TestComponent = () => {
    const [{ 
        data,
        error,
        isError,
        isLoading,
        isSuccess,
        status,
        statusCode,
    }, handler ] = useFetch('http://your-endpoint-url', options);
    
    const getData = () => {
        const handlerOptions = {
            body:{},
            headers: {},
            method: 'post',
            params: {},
            url: '',
            withCredentials: true
        }

        handler(handlerOptions);
    };

    return (<button onClick={getData}>test</button>);
};

export default TestComponent;
```
> `URL` first param is mandatory


## usePromise
This hook executes a `Promise` when calling the handler function.

### Usage
```js
import { usePromise } from '@anb98/react-hooks';

const promise = () => Promise.resolve('example');

const options = {
    initialData: {},
    onFail: (err) => {},
    onSuccess: (data) => {},
    onComplete: (data, err) => {},
};

const TestComponent = () => {
    const [{ 
        data,
        error,
        isError,
        isLoading,
        isSuccess,
        status,
    }, handler ] = useFetch(promise, options);
    
    const getPromiseResult = () => {
        const handlerOptions = {example: 'test'};
        handler(handlerOptions);
    };

    return (<button onClick={getPromiseResult}>test</button>);
};

export default TestComponent;
```
> `promise` function param is __mandatory__

> `handlerOptions` are passed to `promise` function
### Initial options
|Property|Description|Type|Default|
|-|-|-|-|
| initialData | Initial data to return as result | `any` | `null` |
| onFail | Callback called when request fails | `function(err)`| `()=>{}` |
| onSuccess | Callback called when request fails | `function(data)` | `()=>{}` |
| onComplete | Callback called when request completes | `function(data, err)` | `()=>{}` |

### Returned state
|Property|Description|Type|Default|
|-|-|-|-|
| data | Result of the request | `any` | `initialData` |
| error | Error of the request | `any` | `null` |
| isError | It shows if the request fails | `boolean` | `false` |
| isLoading | It shows if the request is loading | `boolean` | `false` |
| isSuccess | It shows if the request completed successfully | `boolean` | `false` |
| status | It shows the request's status | `idle` \| `pending` \| `resolved` \| `rejected` | `idle` |


## `useFetchCache` and `useLazyFetchCache`
This hooks allow to cache results from request previously fetched.
To use this hooks you first need `CacheProvider`.

```js
import { CacheProvider } from '@anb98/react-hooks';

const App = () => (
    <div className="App">
        <CacheProvider>
            <Main/>
        </CacheProvider>
    </div>
);
```

> All the options and returned values for `useFetchCache` and `useLazyFetchCache` are the same  from `useFetch` and `useLazyFetch` respectively.

> To refresh the next request you can add `{ refresh: true }` as second param when calling handler.

Example:
```js
<button 
    onClick={()=>handler({}, { refresh: true })}
>
    Fetch Cache
</button>
```
## useSearch
This hook filters results when searching.

### Usage
```js
import { useSearch } from '@anb98/react-hooks';

const options = {
    allowFields: [],
    denyFields: []
    sourceData: []
};

const TestComponent = () => {
    const {
        setSourceData,
        setSearchValue,
        filtered,
        sourceData
    } = useSearch(options);

    return (
        <div>
            <input type="text" onChange={(evt)=> setSearchValue(evt.target.value) } />

            <ul>
                {
                    filtered.map((el)=>(
                        <li key={el.id}>{JSON.stringify(el)}</li>
                    ))
                }
            </ul>
        </div>
    );
}
```

### Initial options
|Property|Description|Type|Default|
|-|-|-|-|
| allowFields | Fields in which search | `Array<string>` | `[]` |
| denyFields | Fields in which not search | `Array<string>` | `[]` |
| sourceData | Source data to search | `Array<Object>` | `[]` |

### Returned
|Property|Description|Type|Default|
|-|-|-|-|
| setSourceData | Function to set sourceData | `function(Array<Object>)` | |
| setSearchValue | Function to set search value | `function(string)` | |
| filtered | Filtered results from sourceData | `Array<string>` | `[]` |
| sourceData | Previously set source data | `Array<Object>` | `[]` |