"use strict";

var _CacheContext = require("./CacheContext");

var _useDataApiCache = _interopRequireDefault(require("./useDataApiCache"));

var _useDataApi = _interopRequireDefault(require("./useDataApi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  CacheProvider: _CacheContext.CacheProvider,
  useDataApi: _useDataApi.default,
  useDataApiCache: _useDataApiCache.default
};