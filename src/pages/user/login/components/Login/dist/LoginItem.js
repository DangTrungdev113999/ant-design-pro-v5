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
var map_1 = require("./map");
var LoginContext_1 = require("./LoginContext");
var FormItem = antd_1.Form.Item;
var getFormItemOptions = function (_a) {
    var onChange = _a.onChange, defaultValue = _a.defaultValue, _b = _a.customProps, customProps = _b === void 0 ? {} : _b, rules = _a.rules;
    var options = {
        rules: rules || customProps.rules
    };
    if (onChange) {
        options.onChange = onChange;
    }
    if (defaultValue) {
        options.initialValue = defaultValue;
    }
    return options;
};
var LoginItem = function (props) {
    var onChange = props.onChange, customProps = props.customProps, defaultValue = props.defaultValue, rules = props.rules, name = props.name, getCaptchaButtonText = props.getCaptchaButtonText, updateActive = props.updateActive, type = props.type, restProps = __rest(props, ["onChange", "customProps", "defaultValue", "rules", "name", "getCaptchaButtonText", "updateActive", "type"]);
    if (!name) {
        return null;
    }
    // get getFieldDecorator props
    var options = getFormItemOptions(props);
    var otherProps = restProps || {};
    return (react_1["default"].createElement(FormItem, __assign({ name: name }, options),
        react_1["default"].createElement(antd_1.Input, __assign({}, customProps, otherProps))));
};
var LoginItems = {};
Object.keys(map_1["default"]).forEach(function (key) {
    var item = map_1["default"][key];
    LoginItems[key] = function (props) { return (react_1["default"].createElement(LoginContext_1["default"].Consumer, null, function (context) { return (react_1["default"].createElement(LoginItem, __assign({ customProps: item.props, rules: item.rules }, props, { type: key }, context, { updateActive: context.updateActive }))); })); };
});
exports["default"] = LoginItems;
