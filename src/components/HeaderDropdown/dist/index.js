"use strict";
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
var antd_1 = require("antd");
var react_1 = require("react");
var classnames_1 = require("classnames");
var index_less_1 = require("./index.less");
var HeaderDropdown = function (_a) {
    var cls = _a.overlayClassName, restProps = __rest(_a, ["overlayClassName"]);
    return (react_1["default"].createElement(antd_1.Dropdown, __assign({ overlayClassName: classnames_1["default"](index_less_1["default"].container, cls) }, restProps)));
};
exports["default"] = HeaderDropdown;
