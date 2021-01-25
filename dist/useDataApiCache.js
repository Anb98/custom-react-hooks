"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _axios = _interopRequireDefault(require("axios"));

var _CacheContext = require("./CacheContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reducer = function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return _objectSpread(_objectSpread({}, state), {}, {
        status: 0,
        isSuccess: false,
        isLoading: true,
        isError: false,
        error: null,
        data: null
      });

    case 'FETCH_SUCCESS':
      return _objectSpread(_objectSpread({}, state), {}, {
        status: action.payload.status,
        isSuccess: Math.random(),
        isLoading: false,
        isError: false,
        data: action.payload.data
      });

    case 'FETCH_FAILURE':
      return _objectSpread(_objectSpread({}, state), {}, {
        status: action.payload.status,
        isSuccess: false,
        isLoading: false,
        isError: true,
        error: action.payload.data
      });

    default:
      throw new Error();
  }
};
/**
 * Callback called when request succeeds
 * @callback onSuccess
 * @param {any} data - Result from request
 */

/**
 * Callback called when request fails
 * @callback onFail
 * @param {any} error - Error from request
 */

/**
 * Callback called when request completes
 * @callback onComplete
 * @param {any} data - Result from request
 * @param {any} error - Error from request
 */

/**
 * Request state
 * @typedef {Object} state
 * @prop {boolean} isLoading - Loading
 * @prop {boolean} isError - Request has failed
 * @prop {boolean} isSuccess - Request has succeed
 * @prop {boolean} status - State from request
 * @prop {any} data - Result from request
 * @prop {any} error - Error from request
 */

/**
 * Initial settings
 * @typedef {Object} initialSettings
 * @prop {string} [url] - Initial URL to request
 * @prop {object} [headers] - Header request
 * @prop {boolean} [hasCache] - Allow cache result request
 * @prop {onSuccess} [onSuccess] - Callback called when request succeeds
 * @prop {onFail} [onFail] - Callback called when request fails
 * @prop {onComplete} [onComplete] - Callback called when request completes
 */

/**
 * useDataApiCache
 * @param {initialSettings} [initialSettings] - Initial settings
 * @return {state | fetchData}
 */


var useDataApiCache = function useDataApiCache() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      originalUrl = _ref.url,
      _ref$headers = _ref.headers,
      headers = _ref$headers === void 0 ? {} : _ref$headers,
      _ref$hasCache = _ref.hasCache,
      hasCache = _ref$hasCache === void 0 ? false : _ref$hasCache,
      _ref$onSuccess = _ref.onSuccess,
      onSuccess = _ref$onSuccess === void 0 ? function () {} : _ref$onSuccess,
      _ref$onFail = _ref.onFail,
      onFail = _ref$onFail === void 0 ? function () {} : _ref$onFail,
      _ref$onComplete = _ref.onComplete,
      onComplete = _ref$onComplete === void 0 ? function () {} : _ref$onComplete;

  var _useContext = (0, _react.useContext)(_CacheContext.CacheContext),
      stateCache = _useContext.state,
      setResult = _useContext.setResult;

  var _useReducer = (0, _react.useReducer)(reducer, {
    isSuccess: false,
    isLoading: false,
    isError: false,
    data: null,
    error: null
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var requestApi = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, stringRequest) {
      var result, data, status, _error$response;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              dispatch({
                type: 'FETCH_INIT'
              });
              _context.next = 4;
              return (0, _axios.default)(request);

            case 4:
              result = _context.sent;
              data = result.data, status = result.status;
              dispatch({
                type: 'FETCH_SUCCESS',
                payload: {
                  data: data,
                  status: status
                }
              });

              if (hasCache) {
                setResult(stringRequest, data);
              }

              onSuccess(data);
              onComplete(data, null);
              _context.next = 17;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);
              dispatch({
                type: 'FETCH_FAILURE',
                payload: {
                  data: _context.t0,
                  status: (_error$response = _context.t0.response) === null || _error$response === void 0 ? void 0 : _error$response.status
                }
              });
              onFail(_context.t0);
              onComplete(null, _context.t0);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 12]]);
    }));

    return function requestApi(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * Params
   * @typedef {Object} fetchDataParams
   * @prop {any} [body] - Body request
   * @prop {string} [method=get] - HTTP method
   * @prop {string} [params] - Params request
   * @prop {string} [url] - URL to request
   * @prop {boolean} [refreshCache=false] - Refresh cache
   * @prop {boolean} [withCredentials=false]
   */

  /**
   * fetchData
   * @param {fetchDataParams}
   */


  var fetchData = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _ref4,
          _ref4$body,
          body,
          _ref4$method,
          method,
          _ref4$params,
          params,
          _ref4$url,
          url,
          _ref4$refreshCache,
          refreshCache,
          _ref4$withCredentials,
          withCredentials,
          request,
          stringRequest,
          _args2 = arguments;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _ref4 = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {}, _ref4$body = _ref4.body, body = _ref4$body === void 0 ? null : _ref4$body, _ref4$method = _ref4.method, method = _ref4$method === void 0 ? 'get' : _ref4$method, _ref4$params = _ref4.params, params = _ref4$params === void 0 ? undefined : _ref4$params, _ref4$url = _ref4.url, url = _ref4$url === void 0 ? originalUrl : _ref4$url, _ref4$refreshCache = _ref4.refreshCache, refreshCache = _ref4$refreshCache === void 0 ? false : _ref4$refreshCache, _ref4$withCredentials = _ref4.withCredentials, withCredentials = _ref4$withCredentials === void 0 ? false : _ref4$withCredentials;

              if (!state.isLoading) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return");

            case 3:
              // Request in process
              request = {
                method: method,
                url: url,
                headers: _objectSpread(_objectSpread({}, _axios.default.defaults.headers.common), headers),
                data: body,
                params: params,
                withCredentials: withCredentials
              };
              stringRequest = JSON.stringify(request);

              if (hasCache) {
                _context2.next = 8;
                break;
              }

              requestApi(request);
              return _context2.abrupt("return");

            case 8:
              if (stateCache[stringRequest] && !refreshCache) {
                dispatch({
                  type: 'FETCH_SUCCESS',
                  payload: {
                    data: stateCache[stringRequest],
                    status: 200
                  }
                });
                onSuccess(stateCache[stringRequest]);
                onComplete(stateCache[stringRequest], null);
              } else {
                requestApi(request, stringRequest);
              }

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function fetchData() {
      return _ref3.apply(this, arguments);
    };
  }();

  return [state, fetchData];
};

var _default = useDataApiCache;
exports.default = _default;