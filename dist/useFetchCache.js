import * as React from 'react';
import useLazyFetchCache from './useLazyFetchCache';
export default (function (props) {
    var _a = useLazyFetchCache(props), state = _a[0], handler = _a[1];
    React.useEffect(function () {
        handler(props === null || props === void 0 ? void 0 : props.request);
    }, []);
    return [state, handler];
});
//# sourceMappingURL=useFetchCache.js.map