"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
var react_1 = require("react");
var umi_1 = require("umi");
var AvatarDropdown_1 = require("./AvatarDropdown");
var HeaderSearch_1 = require("../HeaderSearch");
var index_less_1 = require("./index.less");
var ENVTagColor = {
    dev: 'orange',
    test: 'green',
    pre: '#87d068'
};
var GlobalHeaderRight = function () {
    var initialState = umi_1.useModel('@@initialState').initialState;
    if (!initialState || !initialState.settings) {
        return null;
    }
    var _a = initialState.settings, navTheme = _a.navTheme, layout = _a.layout;
    var className = index_less_1["default"].right;
    if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
        className = index_less_1["default"].right + "  " + index_less_1["default"].dark;
    }
    return (react_1["default"].createElement(antd_1.Space, { className: className },
        react_1["default"].createElement(HeaderSearch_1["default"], { className: index_less_1["default"].action + " " + index_less_1["default"].search, placeholder: "Search", options: [
            // { label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>, value: 'umi ui' },
            // {
            //   label: <a href="next.ant.design">Ant Design</a>,
            //   value: 'Ant Design',
            // },
            // {
            //   label: <a href="https://protable.ant.design/">Pro Table</a>,
            //   value: 'Pro Table',
            // },
            // {
            //   label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            //   value: 'Pro Layout',
            // },
            ] }),
        react_1["default"].createElement(AvatarDropdown_1["default"], null),
        REACT_APP_ENV && (react_1["default"].createElement("span", null,
            react_1["default"].createElement(antd_1.Tag, { color: ENVTagColor[REACT_APP_ENV] }, REACT_APP_ENV)))));
};
exports["default"] = GlobalHeaderRight;
