"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var use_merge_value_1 = require("use-merge-value");
var react_1 = require("react");
var classnames_1 = require("classnames");
var index_less_1 = require("./index.less");
var HeaderSearch = function (props) {
    var _a;
    var className = props.className, defaultValue = props.defaultValue, onVisibleChange = props.onVisibleChange, placeholder = props.placeholder, open = props.open, defaultOpen = props.defaultOpen, restProps = __rest(props, ["className", "defaultValue", "onVisibleChange", "placeholder", "open", "defaultOpen"]);
    var inputRef = react_1.useRef(null);
    var _b = use_merge_value_1["default"](defaultValue, {
        value: props.value,
        onChange: props.onChange
    }), value = _b[0], setValue = _b[1];
    var _c = use_merge_value_1["default"](defaultOpen || false, {
        value: props.open,
        onChange: onVisibleChange
    }), searchMode = _c[0], setSearchMode = _c[1];
    var inputClass = classnames_1["default"](index_less_1["default"].input, (_a = {},
        _a[index_less_1["default"].show] = searchMode,
        _a));
    return (react_1["default"].createElement("div", { className: classnames_1["default"](className, index_less_1["default"].headerSearch), onClick: function () {
            setSearchMode(true);
            if (searchMode && inputRef.current) {
                inputRef.current.focus();
            }
        }, onTransitionEnd: function (_a) {
            var propertyName = _a.propertyName;
            if (propertyName === 'width' && !searchMode) {
                if (onVisibleChange) {
                    onVisibleChange(searchMode);
                }
            }
        } },
        react_1["default"].createElement(icons_1.SearchOutlined, { key: "Icon", style: {
                cursor: 'pointer'
            } }),
        react_1["default"].createElement(antd_1.AutoComplete, { key: "AutoComplete", className: inputClass, value: value, options: restProps.options, onChange: setValue },
            react_1["default"].createElement(antd_1.Input, { size: "small", ref: inputRef, defaultValue: defaultValue, "aria-label": placeholder, placeholder: placeholder, onKeyDown: function (e) {
                    if (e.key === 'Enter') {
                        if (restProps.onSearch) {
                            restProps.onSearch(value);
                        }
                    }
                }, onBlur: function () {
                    setSearchMode(false);
                } }))));
};
exports["default"] = HeaderSearch;
