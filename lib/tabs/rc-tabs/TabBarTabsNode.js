'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dropdown = require('lbc-wrapper/lib/dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _menu = require('lbc-wrapper/lib/menu');

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabBarTabsNode = function (_React$Component) {
  _inherits(TabBarTabsNode, _React$Component);

  function TabBarTabsNode() {
    _classCallCheck(this, TabBarTabsNode);

    return _possibleConstructorReturn(this, (TabBarTabsNode.__proto__ || Object.getPrototypeOf(TabBarTabsNode)).apply(this, arguments));
  }

  _createClass(TabBarTabsNode, [{
    key: 'closeOtherTabs',
    value: function closeOtherTabs(key) {
      this.props.tabstore.dispatch({
        type: 'LB_RR_E_CLOSE_OTHER_TABS',
        payload: key
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.panels,
          activeKey = _props.activeKey,
          prefixCls = _props.prefixCls,
          tabBarGutter = _props.tabBarGutter;

      var rst = [];

      _react2.default.Children.forEach(children, function (child, index) {
        if (!child) {
          return;
        }
        var key = child.key;
        var cls = activeKey === key ? prefixCls + '-tab-active' : '';
        cls += ' ' + prefixCls + '-tab';
        var events = {};
        if (child.props.disabled) {
          cls += ' ' + prefixCls + '-tab-disabled';
        } else {
          events = {
            onClick: _this2.props.onTabClick.bind(_this2, key)
          };
        }
        var ref = {};
        if (activeKey === key) {
          ref.ref = _this2.props.saveRef('activeTab');
        }
        (0, _warning2.default)('tab' in child.props, 'There must be `tab` property on children of Tabs.');
        rst.push(_react2.default.createElement(
          _dropdown2.default,
          {
            key: key,
            overlay: _react2.default.createElement(
              _menu2.default,
              { onClick: _this2.closeOtherTabs.bind(_this2, key) },
              _react2.default.createElement(
                _menu.Item,
                null,
                _react2.default.createElement(
                  'span',
                  null,
                  '\u5173\u95ED\u5176\u4ED6\u6807\u7B7E'
                )
              )
            ),
            trigger: ['contextMenu']
          },
          _react2.default.createElement(
            'div',
            _extends({
              role: 'tab',
              'aria-disabled': child.props.disabled ? 'true' : 'false',
              'aria-selected': activeKey === key ? 'true' : 'false'
            }, events, {
              className: cls,
              key: key,
              style: { marginRight: tabBarGutter && index === children.length - 1 ? 0 : tabBarGutter }
            }, ref),
            child.props.tab
          )
        ));
      });

      return _react2.default.createElement(
        'div',
        null,
        rst
      );
    }
  }]);

  return TabBarTabsNode;
}(_react2.default.Component);

exports.default = TabBarTabsNode;


TabBarTabsNode.propTypes = {
  activeKey: _propTypes2.default.string,
  panels: _propTypes2.default.node,
  prefixCls: _propTypes2.default.string,
  tabBarGutter: _propTypes2.default.number,
  onTabClick: _propTypes2.default.func,
  saveRef: _propTypes2.default.func
};

TabBarTabsNode.defaultProps = {
  panels: [],
  prefixCls: [],
  tabBarGutter: null,
  onTabClick: function onTabClick() {},
  saveRef: function saveRef() {}
};