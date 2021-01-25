# Hooks

## useDataApi
This hook is used to consume API

### Usage
```js
import React, {useEffect} from 'react';
import { useDataApi } from 'custom-react-hooks';

const options = { 
    url: 'http://your-endpoint-url',
    onSuccess: (data)=> {},    
    onFail: (err)=>{}          
    onComplete: (data, err)=>{}
    headers: {}                
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
            method: 'post',
            params: {},
            url: '',
            withCredentials: true
        }

        fetchData(fetchOptions);
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
| url | Initial URL to request | `string` | `null` |
| onSuccess | Callback called when request fails | `function(data)` | `()=>` |
| onFail | Callback called when request fails | `function(err)`| `()=>` |
| onComplete | Callback called when request completes | `function(data, err)` | `()=>` |
| headers | Request headers | `object` | `{}` |


### fetchData options
| Property | Description | Type | Default |
|-|-|-|-|
| body | Body request | `any` | `null`|
| method | HTTP method | `string` | `get`|
| params | Params request | `any` | - |
| url | URL to request | `string` | Initial URL to request |
| withCredentials | Enable coockie credential | `boolean` | `false` |