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
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var lodash_1 = require("lodash");
var moment_1 = require("moment");
var umi_1 = require("umi");
var user_1 = require("@/services/user");
var NoticeIcon_1 = require("./NoticeIcon");
var index_less_1 = require("./index.less");
var getNoticeData = function (notices) {
    if (!notices || notices.length === 0 || !Array.isArray(notices)) {
        return {};
    }
    var newNotices = notices.map(function (notice) {
        var newNotice = __assign({}, notice);
        if (newNotice.datetime) {
            newNotice.datetime = moment_1["default"](notice.datetime).fromNow();
        }
        if (newNotice.id) {
            newNotice.key = newNotice.id;
        }
        if (newNotice.extra && newNotice.status) {
            var color = {
                todo: '',
                processing: 'blue',
                urgent: 'red',
                doing: 'gold'
            }[newNotice.status];
            newNotice.extra = (react_1["default"].createElement(antd_1.Tag, { color: color, style: {
                    marginRight: 0
                } }, newNotice.extra));
        }
        return newNotice;
    });
    return lodash_1.groupBy(newNotices, 'type');
};
var getUnreadData = function (noticeData) {
    var unreadMsg = {};
    Object.keys(noticeData).forEach(function (key) {
        var value = noticeData[key];
        if (!unreadMsg[key]) {
            unreadMsg[key] = 0;
        }
        if (Array.isArray(value)) {
            unreadMsg[key] = value.filter(function (item) { return !item.read; }).length;
        }
    });
    return unreadMsg;
};
var NoticeIconView = function () {
    var initialState = umi_1.useModel('@@initialState').initialState;
    var currentUser = (initialState || {}).currentUser;
    var _a = react_1.useState([]), notices = _a[0], setNotices = _a[1];
    react_1.useEffect(function () {
        user_1.queryNotices().then(function (_a) {
            var data = _a.data;
            return setNotices(data);
        });
    }, []);
    var noticeData = getNoticeData(notices);
    var unreadMsg = getUnreadData(noticeData || {});
    var changeReadState = react_1.useCallback(function (id) {
        setNotices(notices.map(function (item) {
            var notice = __assign({}, item);
            if (notice.id === id) {
                notice.read = true;
            }
            return notice;
        }));
    }, []);
    var clearReadState = function (title, key) {
        setNotices(notices.map(function (item) {
            var notice = __assign({}, item);
            if (notice.type === key) {
                notice.read = true;
            }
            return notice;
        }));
        antd_1.message.success('success' + " " + title);
    };
    return (react_1["default"].createElement(NoticeIcon_1["default"], { className: index_less_1["default"].action, count: currentUser && currentUser.unreadCount, onItemClick: function (item) {
            changeReadState(item.id);
        }, onClear: function (title, key) { return clearReadState(title, key); }, loading: false, clearText: "false", viewMoreText: "false", onViewMore: function () { return antd_1.message.info('Click on view more'); }, clearClose: true },
        react_1["default"].createElement(NoticeIcon_1["default"].Tab, { tabKey: "notification", count: unreadMsg.notification, list: noticeData.notification, title: "notification", emptyText: "notification", showViewMore: true }),
        react_1["default"].createElement(NoticeIcon_1["default"].Tab, { tabKey: "message", count: unreadMsg.message, list: noticeData.message, title: "message", emptyText: "message", showViewMore: true }),
        react_1["default"].createElement(NoticeIcon_1["default"].Tab, { tabKey: "event", title: "event", emptyText: "event", count: unreadMsg.event, list: noticeData.event, showViewMore: true })));
};
exports["default"] = NoticeIconView;
