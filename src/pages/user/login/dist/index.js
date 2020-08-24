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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var antd_1 = require("antd");
var react_1 = require("react");
var umi_1 = require("umi");
var utils_1 = require("@/utils/utils");
var logo_png_1 = require("@/assets/logo.png");
var login_1 = require("@/services/login");
var Footer_1 = require("@/components/Footer");
var Login_1 = require("./components/Login");
var style_less_1 = require("./style.less");
var Username = Login_1["default"].Username, Password = Login_1["default"].Password, Submit = Login_1["default"].Submit;
var LoginMessage = function (_a) {
    var content = _a.content;
    return (react_1["default"].createElement(antd_1.Alert, { style: {
            marginBottom: 24
        }, message: content, type: "error", showIcon: true }));
};
var replaceGoto = function () {
    var urlParams = new URL(window.location.href);
    var params = utils_1.getPageQuery();
    var redirect = params.redirect;
    if (redirect) {
        var redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
                redirect = redirect.substr(redirect.indexOf('#'));
            }
        }
        else {
            window.location.href = '/';
            return;
        }
    }
    window.location.href = urlParams.href.split(urlParams.pathname)[0] + (redirect || '/');
};
var Login = function () {
    var _a = react_1.useState({}), userLoginState = _a[0], setUserLoginState = _a[1];
    var _b = react_1.useState(false), submitting = _b[0], setSubmitting = _b[1];
    var refresh = umi_1.useModel('@@initialState').refresh;
    var _c = react_1.useState(true), autoLogin = _c[0], setAutoLogin = _c[1];
    var _d = react_1.useState('account'), type = _d[0], setType = _d[1];
    var handleSubmit = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var msg, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, login_1.fakeAccountLogin(__assign(__assign({}, values), { type: type }))];
                case 2:
                    msg = _a.sent();
                    if (msg.status === 'ok') {
                        antd_1.message.success('Đăng nhập thành công!');
                        replaceGoto();
                        setTimeout(function () {
                            refresh();
                        }, 0);
                        return [2 /*return*/];
                    }
                    setUserLoginState(msg);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    antd_1.message.error('Đăng nhập thất bại！');
                    return [3 /*break*/, 4];
                case 4:
                    setSubmitting(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var status = userLoginState.status, loginType = userLoginState.type;
    return (react_1["default"].createElement("div", { className: style_less_1["default"].container },
        react_1["default"].createElement("div", { className: style_less_1["default"].lang },
            react_1["default"].createElement(umi_1.SelectLang, null)),
        react_1["default"].createElement("div", { className: style_less_1["default"].content },
            react_1["default"].createElement("div", { className: style_less_1["default"].top },
                react_1["default"].createElement("div", { className: style_less_1["default"].header },
                    react_1["default"].createElement(umi_1.Link, { to: "/" },
                        react_1["default"].createElement("img", { alt: "logo", className: style_less_1["default"].logo, src: logo_png_1["default"] }),
                        react_1["default"].createElement("span", { className: style_less_1["default"].title }, "Avy - H\u00E0nh ch\u00EDnh k\u1EBF to\u00E1n"))),
                react_1["default"].createElement("div", { className: style_less_1["default"].desc }, "FinX group")),
            react_1["default"].createElement("div", { className: style_less_1["default"].main },
                react_1["default"].createElement(Login_1["default"], { activeKey: type, onTabChange: setType, onSubmit: handleSubmit },
                    status === 'error' && loginType === 'account' && !submitting ? (react_1["default"].createElement(LoginMessage, { content: "Sai t\u00E0i kho\u1EA3n ho\u1EB7c m\u1EADt kh\u1EA9u" })) : null,
                    react_1["default"].createElement(Username, { name: "username", placeholder: "admin or user", defaultValue: "admin", rules: [
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại'
                            },
                        ] }),
                    react_1["default"].createElement(Password, { name: "password", placeholder: " ant.design", defaultValue: "ant.design", rules: [
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu！'
                            },
                        ] }),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement(antd_1.Checkbox, { checked: autoLogin, onChange: function (e) { return setAutoLogin(e.target.checked); } }, "Nh\u1EDB t\u00E0i kho\u1EA3n")),
                    react_1["default"].createElement(Submit, { loading: submitting }, "\u0110\u0103ng nh\u1EADp")))),
        react_1["default"].createElement(Footer_1["default"], null)));
};
exports["default"] = Login;
