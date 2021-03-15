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
import useDataApi from './useDataApi';
import { CacheContext } from './CacheContext';
export default (function (props) {
    var _a = props || {}, _b = _a.refresh, initialRefresh = _b === void 0 ? false : _b, _c = _a.onSuccess, onSuccess = _c === void 0 ? function () { } : _c;
    var _d = React.useContext(CacheContext), stateCache = _d.state, setResult = _d.setResult;
    var _e = React.useState(''), stringRequest = _e[0], setStringRequest = _e[1];
    var _f = React.useState(null), resultCache = _f[0], setResultCache = _f[1];
    var setCache = function (data) {
        setResult(stringRequest, data);
        setResultCache(data);
        onSuccess(data);
    };
    var _g = useDataApi(__assign(__assign({}, props), { lazy: true, onSuccess: setCache })), stateApi = _g[0], fetchData = _g[1];
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
    React.useEffect(function () {
        if (!(props === null || props === void 0 ? void 0 : props.lazy)) {
            verifyCache(props === null || props === void 0 ? void 0 : props.request, { refresh: initialRefresh });
        }
    }, []);
    return [__assign(__assign({}, stateApi), { data: resultCache }), verifyCache];
});
//# sourceMappingURL=useDataApiCache.js.map