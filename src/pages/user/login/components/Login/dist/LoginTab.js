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
var react_1 = require("react");
var antd_1 = require("antd");
var LoginContext_1 = require("./LoginContext");
var TabPane = antd_1.Tabs.TabPane;
var generateId = (function () {
    var i = 0;
    return function (prefix) {
        if (prefix === void 0) { prefix = ''; }
        i += 1;
        return "" + prefix + i;
    };
})();
var LoginTab = function (props) {
    react_1.useEffect(function () {
        var uniqueId = generateId('login-tab-');
        var tabUtil = props.tabUtil;
        if (tabUtil) {
            tabUtil.addTab(uniqueId);
        }
    }, []);
    var children = props.children, rest = __rest(props, ["children"]);
    return react_1["default"].createElement(TabPane, __assign({}, rest), children);
};
var WrapContext = function (props) { return (react_1["default"].createElement(LoginContext_1["default"].Consumer, null, function (value) { return react_1["default"].createElement(LoginTab, __assign({ tabUtil: value.tabUtil }, props)); })); };
WrapContext.typeName = 'LoginTab';
exports["default"] = WrapContext;
