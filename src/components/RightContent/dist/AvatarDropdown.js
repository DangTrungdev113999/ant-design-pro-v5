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
var react_1 = require("react");
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var umi_1 = require("umi");
var utils_1 = require("@/utils/utils");
var login_1 = require("@/services/login");
var querystring_1 = require("querystring");
var HeaderDropdown_1 = require("../HeaderDropdown");
var index_less_1 = require("./index.less");
/**
 * 退出登录，并且将当前的 url 保存
 */
var loginOut = function () { return __awaiter(void 0, void 0, void 0, function () {
    var redirect;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, login_1.outLogin()];
            case 1:
                _a.sent();
                redirect = utils_1.getPageQuery().redirect;
                // Note: There may be security issues, please note
                if (window.location.pathname !== '/user/login' && !redirect) {
                    umi_1.history.replace({
                        pathname: '/user/login',
                        search: querystring_1.stringify({
                            redirect: window.location.href
                        })
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
var AvatarDropdown = function (_a) {
    var menu = _a.menu;
    var _b = umi_1.useModel('@@initialState'), initialState = _b.initialState, setInitialState = _b.setInitialState;
    var onMenuClick = react_1.useCallback(function (event) {
        var key = event.key;
        if (key === 'logout') {
            setInitialState(__assign(__assign({}, initialState), { currentUser: undefined }));
            loginOut();
            return;
        }
        umi_1.history.push("/account/" + key);
    }, []);
    var loading = (react_1["default"].createElement("span", { className: index_less_1["default"].action + " " + index_less_1["default"].account },
        react_1["default"].createElement(antd_1.Spin, { size: "small", style: {
                marginLeft: 8,
                marginRight: 8
            } })));
    if (!initialState) {
        return loading;
    }
    var currentUser = initialState.currentUser;
    if (!currentUser || !currentUser.name) {
        return loading;
    }
    var menuHeaderDropdown = (react_1["default"].createElement(antd_1.Menu, { className: index_less_1["default"].menu, selectedKeys: [], onClick: onMenuClick },
        menu && (react_1["default"].createElement(antd_1.Menu.Item, { key: "center" },
            react_1["default"].createElement(icons_1.UserOutlined, null),
            "center")),
        menu && (react_1["default"].createElement(antd_1.Menu.Item, { key: "settings" },
            react_1["default"].createElement(icons_1.SettingOutlined, null),
            "settings")),
        menu && react_1["default"].createElement(antd_1.Menu.Divider, null),
        react_1["default"].createElement(antd_1.Menu.Item, { key: "logout" },
            react_1["default"].createElement(icons_1.LogoutOutlined, null),
            "logout")));
    return (react_1["default"].createElement(HeaderDropdown_1["default"], { overlay: menuHeaderDropdown },
        react_1["default"].createElement("span", { className: index_less_1["default"].action + " " + index_less_1["default"].account },
            react_1["default"].createElement(antd_1.Avatar, { size: "small", className: index_less_1["default"].avatar, src: currentUser.avatar, alt: "avatar" }),
            react_1["default"].createElement("span", { className: index_less_1["default"].name + " anticon" }, currentUser.name))));
};
exports["default"] = AvatarDropdown;
