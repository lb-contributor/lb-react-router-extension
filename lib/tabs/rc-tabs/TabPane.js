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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPane = function (_React$Component) {
  _inherits(TabPane, _React$Component);

  function TabPane(props) {
    _classCallCheck(this, TabPane);

    var _this = _possibleConstructorReturn(this, (TabPane.__proto__ || Object.getPrototypeOf(TabPane)).call(this, props));

    _this.state = {
      paneH: document.body.clientHeight - 104
    };
    return _this;
  }

  _createClass(TabPane, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var onresize = function onresize() {
        _this2.setState({
          paneH: document.body.clientHeight - 104
        });
      };
      window.onresize = onresize;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          id = _props.id,
          className = _props.className,
          destroyInactiveTabPane = _props.destroyInactiveTabPane,
          active = _props.active,
          forceRender = _props.forceRender,
          rootPrefixCls = _props.rootPrefixCls,
          style = _props.style,
          children = _props.children,
          placeholder = _props.placeholder,
          restProps = _objectWithoutProperties(_props, ['id', 'className', 'destroyInactiveTabPane', 'active', 'forceRender', 'rootPrefixCls', 'style', 'children', 'placeholder']);

      this._isActived = this._isActived || active;
      var prefixCls = rootPrefixCls + '-tabpane';
      var cls = (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, prefixCls, 1), _defineProperty(_classnames, prefixCls + '-inactive', !active), _defineProperty(_classnames, prefixCls + '-active', active), _defineProperty(_classnames, className, className), _classnames));
      var isRender = destroyInactiveTabPane ? active : this._isActived;
      return _react2.default.createElement(
        'div',
        _extends({
          style: _extends({ height: this.state.paneH }, style),
          role: 'tabpanel',
          'aria-hidden': active ? 'false' : 'true',
          className: cls,
          id: id
        }, (0, _utils.getDataAttr)(restProps)),
        isRender || forceRender ? children : placeholder
      );
    }
  }]);

  return TabPane;
}(_react2.default.Component);

exports.default = TabPane;


TabPane.propTypes = {
  className: _propTypes2.default.string,
  active: _propTypes2.default.bool,
  style: _propTypes2.default.any,
  destroyInactiveTabPane: _propTypes2.default.bool,
  forceRender: _propTypes2.default.bool,
  placeholder: _propTypes2.default.node,
  rootPrefixCls: _propTypes2.default.string,
  children: _propTypes2.default.node,
  id: _propTypes2.default.string
};

TabPane.defaultProps = {
  placeholder: null
};