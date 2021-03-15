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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import { globals } from './setGlobals';
import axios from 'axios';
var initialState = {
    isSuccess: false,
    isLoading: false,
    isError: false,
    data: null,
    error: null,
    status: 0,
};
var reducer = function (state, action) {
    switch (action.type) {
        case 'FETCH_INIT':
            return __assign(__assign({}, state), { status: 0, isSuccess: false, isLoading: true, isError: false, error: null, data: null });
        case 'FETCH_SUCCESS':
            return __assign(__assign({}, state), { status: action.payload.status, isSuccess: true, isLoading: false, isError: false, data: action.payload.data });
        case 'FETCH_FAILURE':
            return __assign(__assign({}, state), { status: action.payload.status, isSuccess: false, isLoading: false, isError: true, error: action.payload.data });
        default:
            throw new Error();
    }
};
/**
 * useDataApi
 * @param initialSettings
 */
export default (function (props) {
    var _a = props || {}, _b = _a.url, initialUrl = _b === void 0 ? '' : _b, defaultRequest = _a.request, _c = _a.onSuccess, onSuccess = _c === void 0 ? function () { } : _c, _d = _a.onComplete, onComplete = _d === void 0 ? function () { } : _d, _e = _a.onFail, onFail = _e === void 0 ? function () { } : _e, _f = _a.lazy, lazy = _f === void 0 ? false : _f;
    var initialHeaders = (defaultRequest === null || defaultRequest === void 0 ? void 0 : defaultRequest.headers) || globals.headers;
    var defaultWithCredentials = (defaultRequest === null || defaultRequest === void 0 ? void 0 : defaultRequest.withCredentials) || globals.withCredentials;
    var _g = React.useReducer(reducer, initialState), state = _g[0], dispatch = _g[1];
    var fetchData = function (request) {
        if (request === void 0) { request = {}; }
        return __awaiter(void 0, void 0, void 0, function () {
            var url, _a, data, status_1, error_1;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        if (state.isLoading)
                            return [2 /*return*/];
                        url = request.url || initialUrl;
                        request.url = globals.baseURL ? globals.baseURL + "/" + url : url;
                        request.headers = request.headers || initialHeaders;
                        request.withCredentials = defaultWithCredentials;
                        request.method = request.method || 'GET';
                        dispatch({ type: 'FETCH_INIT' });
                        return [4 /*yield*/, axios(request)];
                    case 1:
                        _a = _c.sent(), data = _a.data, status_1 = _a.status;
                        dispatch({ type: 'FETCH_SUCCESS', payload: { data: data, status: status_1 } });
                        onSuccess(data);
                        onComplete(data, null);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _c.sent();
                        dispatch({ type: 'FETCH_FAILURE', payload: { data: error_1, status: (_b = error_1.response) === null || _b === void 0 ? void 0 : _b.status } });
                        onFail(error_1);
                        onComplete(undefined, error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    React.useEffect(function () {
        if (!lazy) {
            fetchData(defaultRequest);
        }
    }, []);
    return [state, fetchData];
});
//# sourceMappingURL=useDataApi.js.map