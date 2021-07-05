# Hooks

## Table of Contents
## Installation

## setGlobals
This function allows you to set globals options for useDataApi

### Usage
```js
setGlobals({
    baseURL: 'http://your-base-url',
    headers: {},
    withCredentials: true,
})
```

### setGlobals options
|Property|Description|Type|Default|
|-|-|-|-|
| baseURL | It sets base url to be concatenate with url of useDataApi options | `string` | `''` |
| headers | Request headers |  `any` | `null` |
| withCredentials | Enable cookie credentials | `boolean` | `false` |

## useDataApi
This hook is used to consume API at component mount

### Usage
```js
import React, {useEffect} from 'react';
import { useDataApi } from 'custom-react-hooks';

const options = {
    url: 'http://your-endpoint-url',
    request: {},
    lazy: true,
    onSuccess: (data) => {},
    onFail: (err) => {},
    onComplete: (data, err) => {},
};

const TestComponent = () => {
    const [{ 
        isSuccess, 
        isLoading, 
        isError, 
        data, 
        error
    }, fetchData ] = useDataApi(options);
    
    useEffect(()=>{
        const fetchDataOptions = {
            body:{},
            headers: {},
            method: 'post',
            params: {},
            url: '',
            withCredentials: true
        }

        fetchData(fetchDataOptions);
    },[])

    return (
        <div>
            test
        </div>
    );
};

export default TestComponent;
```

### useDataApi initial options
|Property|Description|Type|Default|
|-|-|-|-|
| url | Initial URL to request | `string` | `globals.baseURL` |
| request | Request config object axios | [`Request config axios`](https://github.com/axios/axios#request-config) | `{}` |
| lazy | Stops fetching data at component mount | `boolean` | `false` |
| onSuccess | Callback called when request fails | `function(data)` | `()=>` |
| onFail | Callback called when request fails | `function(err)`| `()=>` |
| onComplete | Callback called when request completes | `function(data, err)` | `()=>` |

### fetchData options uses type [Request config from axios](https://github.com/axios/axios#request-config)