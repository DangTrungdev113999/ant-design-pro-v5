"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var antd_1 = require("antd");
var react_1 = require("react");
var use_merge_value_1 = require("use-merge-value");
var classnames_1 = require("classnames");
var LoginContext_1 = require("./LoginContext");
var LoginItem_1 = require("./LoginItem");
var LoginSubmit_1 = require("./LoginSubmit");
var index_less_1 = require("./index.less");
var Login = function (props) {
    var className = props.className;
    var form = antd_1.Form.useForm()[0];
    var _a = react_1.useState([]), tabs = _a[0], setTabs = _a[1];
    var _b = react_1.useState({}), active = _b[0], setActive = _b[1];
    var _c = use_merge_value_1["default"]('', {
        value: props.activeKey,
        onChange: props.onTabChange
    }), tabActiveType = _c[0], setType = _c[1];
    var TabChildren = [];
    var otherChildren = [];
    react_1["default"].Children.forEach(props.children, function (child) {
        if (!child) {
            return;
        }
        if (child.type.typeName === 'LoginTab') {
            TabChildren.push(child);
        }
        else {
            otherChildren.push(child);
        }
    });
    return (react_1["default"].createElement(LoginContext_1["default"].Provider, { value: {
            tabUtil: {
                addTab: function (id) {
                    setTabs(__spreadArrays(tabs, [id]));
                },
                removeTab: function (id) {
                    setTabs(tabs.filter(function (currentId) { return currentId !== id; }));
                }
            },
            updateActive: function (activeItem) {
                if (!active)
                    return;
                if (active[tabActiveType]) {
                    active[tabActiveType].push(activeItem);
                }
                else {
                    active[tabActiveType] = [activeItem];
                }
                setActive(active);
            }
        } },
        react_1["default"].createElement("div", { className: classnames_1["default"](className, index_less_1["default"].login) },
            react_1["default"].createElement(antd_1.Form, { form: props.from || form, onFinish: function (values) {
                    if (props.onSubmit) {
                        props.onSubmit(values);
                    }
                } }, tabs.length ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(antd_1.Tabs, { destroyInactiveTabPane: true, animated: false, className: index_less_1["default"].tabs, activeKey: tabActiveType, onChange: function (activeKey) {
                        setType(activeKey);
                    } }, TabChildren),
                otherChildren)) : (props.children)))));
};
Login.Submit = LoginSubmit_1["default"];
Login.Username = LoginItem_1["default"].Username;
Login.Password = LoginItem_1["default"].Password;
exports["default"] = Login;
