'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _KeyCode = require('./KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _TabPane = require('./TabPane');

var _TabPane2 = _interopRequireDefault(_TabPane);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function noop() {}

function getDefaultActiveKey(props) {
  var activeKey = void 0;
  _react2.default.Children.forEach(props.children, function (child) {
    if (child && !activeKey && !child.props.disabled) {
      activeKey = child.key;
    }
  });
  return activeKey;
}

function activeKeyIsValid(props, key) {
  var keys = _react2.default.Children.map(props.children, function (child) {
    return child && child.key;
  });
  return keys.indexOf(key) >= 0;
}

var Tabs = function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

    _initialiseProps.call(_this);

    var activeKey = void 0;
    if ('activeKey' in props) {
      activeKey = props.activeKey;
    } else if ('defaultActiveKey' in props) {
      activeKey = props.defaultActiveKey;
    } else {
      activeKey = getDefaultActiveKey(props);
    }

    _this.state = {
      activeKey: activeKey
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('activeKey' in nextProps) {
        this.setState({
          activeKey: nextProps.activeKey
        });
      } else if (!activeKeyIsValid(nextProps, this.state.activeKey)) {
        // https://github.com/ant-design/ant-design/issues/7093
        this.setState({
          activeKey: getDefaultActiveKey(nextProps)
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var props = this.props;

      var prefixCls = props.prefixCls,
          navWrapper = props.navWrapper,
          tabBarPosition = props.tabBarPosition,
          className = props.className,
          renderTabContent = props.renderTabContent,
          renderTabBar = props.renderTabBar,
          destroyInactiveTabPane = props.destroyInactiveTabPane,
          restProps = _objectWithoutProperties(props, ['prefixCls', 'navWrapper', 'tabBarPosition', 'className', 'renderTabContent', 'renderTabBar', 'destroyInactiveTabPane']);

      var cls = (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, prefixCls, 1), _defineProperty(_classnames, prefixCls + '-' + tabBarPosition, 1), _defineProperty(_classnames, className, !!className), _classnames));

      this.tabBar = renderTabBar();
      var contents = [_react2.default.cloneElement(this.tabBar, {
        prefixCls: prefixCls,
        navWrapper: navWrapper,
        key: 'tabBar',
        onKeyDown: this.onNavKeyDown,
        tabBarPosition: tabBarPosition,
        onTabClick: this.onTabClick,
        panels: props.children,
        activeKey: this.state.activeKey
      }), _react2.default.cloneElement(renderTabContent(), {
        prefixCls: prefixCls,
        tabBarPosition: tabBarPosition,
        activeKey: this.state.activeKey,
        destroyInactiveTabPane: destroyInactiveTabPane,
        children: props.children,
        onChange: this.setActiveKey,
        key: 'tabContent'
      })];
      if (tabBarPosition === 'bottom') {
        contents.reverse();
      }
      return _react2.default.createElement(
        'div',
        _extends({
          className: cls,
          style: props.style
        }, (0, _utils.getDataAttr)(restProps)),
        contents
      );
    }
  }]);

  return Tabs;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onTabClick = function (activeKey, e) {
    if (_this2.tabBar.props.onTabClick) {
      _this2.tabBar.props.onTabClick(activeKey, e);
    }
    _this2.setActiveKey(activeKey);
  };

  this.onNavKeyDown = function (e) {
    var eventKeyCode = e.keyCode;
    if (eventKeyCode === _KeyCode2.default.RIGHT || eventKeyCode === _KeyCode2.default.DOWN) {
      e.preventDefault();
      var nextKey = _this2.getNextActiveKey(true);
      _this2.onTabClick(nextKey);
    } else if (eventKeyCode === _KeyCode2.default.LEFT || eventKeyCode === _KeyCode2.default.UP) {
      e.preventDefault();
      var previousKey = _this2.getNextActiveKey(false);
      _this2.onTabClick(previousKey);
    }
  };

  this.setActiveKey = function (activeKey) {
    if (_this2.state.activeKey !== activeKey) {
      if (!('activeKey' in _this2.props)) {
        _this2.setState({
          activeKey: activeKey
        });
      }
      _this2.props.onChange(activeKey);
    }
  };

  this.getNextActiveKey = function (next) {
    var activeKey = _this2.state.activeKey;
    var children = [];
    _react2.default.Children.forEach(_this2.props.children, function (c) {
      if (c && !c.props.disabled) {
        if (next) {
          children.push(c);
        } else {
          children.unshift(c);
        }
      }
    });
    var length = children.length;
    var ret = length && children[0].key;
    children.forEach(function (child, i) {
      if (child.key === activeKey) {
        if (i === length - 1) {
          ret = children[0].key;
        } else {
          ret = children[i + 1].key;
        }
      }
    });
    return ret;
  };
};

exports.default = Tabs;


Tabs.propTypes = {
  destroyInactiveTabPane: _propTypes2.default.bool,
  renderTabBar: _propTypes2.default.func.isRequired,
  renderTabContent: _propTypes2.default.func.isRequired,
  navWrapper: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  children: _propTypes2.default.node,
  prefixCls: _propTypes2.default.string,
  className: _propTypes2.default.string,
  tabBarPosition: _propTypes2.default.string,
  style: _propTypes2.default.object,
  activeKey: _propTypes2.default.string,
  defaultActiveKey: _propTypes2.default.string
};

Tabs.defaultProps = {
  prefixCls: 'rc-tabs',
  destroyInactiveTabPane: false,
  onChange: noop,
  navWrapper: function navWrapper(arg) {
    return arg;
  },
  tabBarPosition: 'top',
  children: null,
  style: {}
};

Tabs.TabPane = _TabPane2.default;