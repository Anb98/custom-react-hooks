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
export var CacheContext = React.createContext({ state: {}, setResult: function () { } });
export default (function (_a) {
    var children = _a.children;
    var _b = React.useState({}), state = _b[0], setState = _b[1];
    var setResult = function (objectRequest, result) {
        setState(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[objectRequest] = result, _a)));
        });
    };
    return (React.createElement(CacheContext.Provider, { value: { state: state, setResult: setResult } }, children));
});
//# sourceMappingURL=CacheContext.js.map