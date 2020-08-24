"use strict";
exports.__esModule = true;
var react_1 = require("react");
var pro_layout_1 = require("@ant-design/pro-layout");
var antd_1 = require("antd");
var Welcome_less_1 = require("./Welcome.less");
var CodePreview = function (_a) {
    var children = _a.children;
    return (react_1["default"].createElement("pre", { className: Welcome_less_1["default"].pre },
        react_1["default"].createElement("code", null,
            react_1["default"].createElement(antd_1.Typography.Text, { copyable: true }, children))));
};
exports["default"] = (function () { return (react_1["default"].createElement(pro_layout_1.PageContainer, null,
    react_1["default"].createElement(antd_1.Card, null,
        react_1["default"].createElement(antd_1.Alert, { message: "\u66F4\u5FEB\u66F4\u5F3A\u7684\u91CD\u578B\u7EC4\u4EF6\uFF0C\u5DF2\u7ECF\u53D1\u5E03\u3002", type: "success", showIcon: true, banner: true, style: {
                margin: -12,
                marginBottom: 24
            } }),
        react_1["default"].createElement(antd_1.Typography.Text, { strong: true },
            "\u9AD8\u7EA7\u8868\u683C",
            ' ',
            react_1["default"].createElement("a", { href: "https://protable.ant.design/", rel: "noopener noreferrer", target: "__blank" }, "\u6B22\u8FCE\u4F7F\u7528")),
        react_1["default"].createElement(CodePreview, null, "yarn add @ant-design/pro-table"),
        react_1["default"].createElement(antd_1.Typography.Text, { strong: true, style: {
                marginBottom: 12
            } },
            "\u9AD8\u7EA7\u5E03\u5C40",
            ' ',
            react_1["default"].createElement("a", { href: "https://prolayout.ant.design/", rel: "noopener noreferrer", target: "__blank" }, "\u6B22\u8FCE\u4F7F\u7528")),
        react_1["default"].createElement(CodePreview, null, "yarn add @ant-design/pro-layout")))); });
