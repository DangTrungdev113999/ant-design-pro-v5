"use strict";
exports.__esModule = true;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var use_merge_value_1 = require("use-merge-value");
var react_1 = require("react");
var classnames_1 = require("classnames");
var NoticeList_1 = require("./NoticeList");
var HeaderDropdown_1 = require("../HeaderDropdown");
var index_less_1 = require("./index.less");
var TabPane = antd_1.Tabs.TabPane;
var NoticeIcon = function (props) {
    var getNotificationBox = function () {
        var children = props.children, loading = props.loading, onClear = props.onClear, onTabChange = props.onTabChange, onItemClick = props.onItemClick, onViewMore = props.onViewMore, clearText = props.clearText, viewMoreText = props.viewMoreText;
        if (!children) {
            return null;
        }
        var panes = [];
        react_1["default"].Children.forEach(children, function (child) {
            if (!child) {
                return;
            }
            var _a = child.props, list = _a.list, title = _a.title, count = _a.count, tabKey = _a.tabKey, showClear = _a.showClear, showViewMore = _a.showViewMore;
            var len = list && list.length ? list.length : 0;
            var msgCount = count || count === 0 ? count : len;
            var tabTitle = msgCount > 0 ? title + " (" + msgCount + ")" : title;
            panes.push(react_1["default"].createElement(TabPane, { tab: tabTitle, key: tabKey },
                react_1["default"].createElement(NoticeList_1["default"], { clearText: clearText, viewMoreText: viewMoreText, list: list, tabKey: tabKey, onClear: function () { return onClear && onClear(title, tabKey); }, onClick: function (item) { return onItemClick && onItemClick(item, child.props); }, onViewMore: function (event) { return onViewMore && onViewMore(child.props, event); }, showClear: showClear, showViewMore: showViewMore, title: title })));
        });
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(antd_1.Spin, { spinning: loading, delay: 300 },
                react_1["default"].createElement(antd_1.Tabs, { className: index_less_1["default"].tabs, onChange: onTabChange }, panes))));
    };
    var className = props.className, count = props.count, bell = props.bell;
    var _a = use_merge_value_1["default"](false, {
        value: props.popupVisible,
        onChange: props.onPopupVisibleChange
    }), visible = _a[0], setVisible = _a[1];
    var noticeButtonClass = classnames_1["default"](className, index_less_1["default"].noticeButton);
    var notificationBox = getNotificationBox();
    var NoticeBellIcon = bell || react_1["default"].createElement(icons_1.BellOutlined, { className: index_less_1["default"].icon });
    var trigger = (react_1["default"].createElement("span", { className: classnames_1["default"](noticeButtonClass, { opened: visible }) },
        react_1["default"].createElement(antd_1.Badge, { count: count, style: { boxShadow: 'none' }, className: index_less_1["default"].badge }, NoticeBellIcon)));
    if (!notificationBox) {
        return trigger;
    }
    return (react_1["default"].createElement(HeaderDropdown_1["default"], { placement: "bottomRight", overlay: notificationBox, overlayClassName: index_less_1["default"].popover, trigger: ['click'], visible: visible, onVisibleChange: setVisible }, trigger));
};
NoticeIcon.defaultProps = {
    emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg'
};
NoticeIcon.Tab = NoticeList_1["default"];
exports["default"] = NoticeIcon;
