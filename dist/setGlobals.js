export var globals = {
    baseURL: '',
    headers: null,
    withCredentials: false,
};
export default (function (_a) {
    var _b = _a.baseURL, baseURL = _b === void 0 ? globals.baseURL : _b, _c = _a.headers, headers = _c === void 0 ? globals.headers : _c, _d = _a.withCredentials, withCredentials = _d === void 0 ? globals.withCredentials : _d;
    return Object.assign(globals, { baseURL: baseURL, headers: headers, withCredentials: withCredentials });
});
//# sourceMappingURL=setGlobals.js.map