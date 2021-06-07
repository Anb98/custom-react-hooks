import * as React from 'react';
var useSearch = function (props) {
    if (props === void 0) { props = {}; }
    var _a = props.allowFields, allowFields = _a === void 0 ? [] : _a, _b = props.denyFields, denyFields = _b === void 0 ? [] : _b;
    var _c = React.useState(''), searchValue = _c[0], setSearchValue = _c[1];
    var _d = React.useState([]), filtered = _d[0], setFiltered = _d[1];
    var _e = React.useState([]), sourceData = _e[0], setSourceData = _e[1];
    var filter = function () {
        var searchValues = searchValue.toLowerCase().trim().split(' ');
        var filteredData = sourceData.filter(function (item) {
            var _loop_1 = function (prop) {
                if (denyFields.includes(prop) || (allowFields.length && !allowFields.includes(prop))) {
                    return "continue";
                }
                var value = String(item[prop]).toLocaleLowerCase();
                var coincidences = searchValues.reduce(function (acc, search) { return value.includes(search) ? acc + 1 : acc; }, 0);
                if (coincidences >= searchValues.length)
                    return { value: true };
            };
            for (var prop in item) {
                var state_1 = _loop_1(prop);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            return false;
        });
        setFiltered(filteredData);
    };
    React.useEffect(function () { filter(); }, [searchValue, sourceData]);
    return { filtered: filtered, setSearchValue: setSearchValue, setSourceData: setSourceData, sourceData: sourceData };
};
export default useSearch;
//# sourceMappingURL=useSearch.js.map