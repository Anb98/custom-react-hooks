var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import useLazyFetch from './useLazyFetch';
import { CacheContext } from './CacheContext';
export default (function (props) {
    var _a = (props || {}).onSuccess, onSuccess = _a === void 0 ? function () { } : _a;
    var _b = React.useContext(CacheContext), stateCache = _b.state, setResult = _b.setResult;
    var _c = React.useState(''), stringRequest = _c[0], setStringRequest = _c[1];
    var _d = React.useState(null), resultCache = _d[0], setResultCache = _d[1];
    var setCache = function (data) {
        setResult(stringRequest, data);
        setResultCache(data);
        onSuccess(data);
    };
    var _e = useLazyFetch(__assign(__assign({}, props), { onSuccess: setCache })), stateApi = _e[0], fetchData = _e[1];
    var verifyCache = function (request, _a) {
        var _b = _a === void 0 ? {} : _a, refresh = _b.refresh;
        var stringRequest = JSON.stringify(request);
        if (!refresh && stateCache[stringRequest]) {
            setResultCache(stateCache[stringRequest]);
        }
        else {
            setStringRequest(stringRequest);
            fetchData(request);
        }
    };
    return [__assign(__assign({}, stateApi), { data: resultCache }), verifyCache];
});
//# sourceMappingURL=useLazyFetchCache.js.map