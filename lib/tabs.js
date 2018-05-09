'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _matchPath = require('react-router/matchPath');

var _matchPath2 = _interopRequireDefault(_matchPath);

var _lbcWrapper = require('lbc-wrapper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPane = _lbcWrapper.Tabs.TabPane;

var RoutesTabs = function (_Component) {
  _inherits(RoutesTabs, _Component);

  function RoutesTabs() {
    _classCallCheck(this, RoutesTabs);

    var _this = _possibleConstructorReturn(this, (RoutesTabs.__proto__ || Object.getPrototypeOf(RoutesTabs)).call(this));

    _this.matchRoute = _this.matchRoute.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.addTab = _this.addTab.bind(_this);
    _this.replaceTab = _this.replaceTab.bind(_this);
    _this.remove = _this.remove.bind(_this);
    _this.onEdit = _this.onEdit.bind(_this);
    _this.newTabIndex = 0;
    _this.state = {
      panes: [],
      activeKey: undefined,
      activePath: undefined
    };
    return _this;
  }

  _createClass(RoutesTabs, [{
    key: 'onEdit',
    value: function onEdit(targetKey, action) {
      this[action](targetKey);
    }
  }, {
    key: 'onChange',
    value: function onChange(activeKey) {
      var _this2 = this;

      this.state.panes.forEach(function (pane) {
        if (pane.key === activeKey) {
          _this2.props.history.push(pane.path);
          _this2.setState({ activeKey: activeKey });
        }
      });
    }
  }, {
    key: 'matchRoute',
    value: function matchRoute() {
      var route = this.context.router.route;
      var _props = this.props,
          children = _props.children,
          location = _props.location;

      var $location = location || route.location;
      var panes = this.state.panes.filter(function (pane) {
        return pane.path === $location.pathname;
      });
      if (panes.length > 0 && panes[0] !== undefined) {
        if (this.state.activePath !== this.context.router.route.location.pathname) {
          var _panes$ = panes[0],
              key = _panes$.key,
              path = _panes$.path;

          this.setState({ activeKey: key, activePath: path });
        }
        return;
      }
      var match = void 0;
      var child = void 0;

      _react2.default.Children.forEach(children, function (element) {
        if (!_react2.default.isValidElement(element)) return;

        var element$props = element.props;
        var pathProp = element$props.path;
        var exact = element$props.exact,
            strict = element$props.strict,
            sensitive = element$props.sensitive,
            from = element$props.from;


        var path = pathProp || from;

        if (match == null) {
          child = element;
          match = path ? (0, _matchPath2.default)($location.pathname, {
            path: path,
            exact: exact,
            strict: strict,
            sensitive: sensitive
          }) : route.match;
        }
      });

      var element = match ? _react2.default.cloneElement(child, { location: $location, computedMatch: match }) : null;
      if (!window.isNewTab) {
        this.replaceTab(element);
      } else {
        this.addTab(element);
      }
    }
  }, {
    key: 'replaceTab',
    value: function replaceTab(content) {
      if (content === null) {
        return;
      }
      var _state = this.state,
          panes = _state.panes,
          activeKey = _state.activeKey;

      var activePath = this.context.router.route.location.pathname;
      var $panes = panes.map(function (pane) {
        if (pane.key === activeKey) {
          return {
            key: activeKey,
            title: content.props.title || 'New Tab',
            content: content,
            path: activePath
          };
        }
        return pane;
      });
      this.setState({ panes: $panes, activePath: activePath });
      window.isNewTab = true;
    }
  }, {
    key: 'addTab',
    value: function addTab(content) {
      if (content === null) {
        return;
      }
      var panes = this.state.panes;

      var activeKey = 'tab$' + this.newTabIndex++;
      var activePath = this.context.router.route.location.pathname;
      panes.push({
        key: activeKey,
        title: content.props.title || 'New Tab',
        content: content,
        path: activePath
      });
      this.setState({ panes: panes, activeKey: activeKey, activePath: activePath });
    }
  }, {
    key: 'remove',
    value: function remove(targetKey) {
      var _state2 = this.state,
          activeKey = _state2.activeKey,
          panes = _state2.panes;

      if (panes.length === 1) {
        return;
      }
      var lastIndex = void 0;
      this.state.panes.forEach(function (pane, i) {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      var $panes = panes.filter(function (pane) {
        return pane.key !== targetKey;
      });
      var $pathname = void 0;
      var $activeKey = void 0;
      if (lastIndex >= 0 && activeKey === targetKey) {
        $activeKey = $panes[lastIndex].key;
        $pathname = $panes[lastIndex].path;
      }
      if ($panes.length > 0) {
        this.props.history.push($pathname);
      }
      this.setState({ panes: $panes, activeKey: $activeKey });
    }
  }, {
    key: 'closetab',
    value: function closetab(route) {
      console.log(route);
    }
  }, {
    key: 'render',
    value: function render() {
      this.matchRoute();
      return _react2.default.createElement(
        _lbcWrapper.Tabs,
        { hideAdd: true, onChange: this.onChange, activeKey: this.state.activeKey, type: this.state.panes.length > 1 ? 'editable-card' : 'card', onEdit: this.onEdit },
        this.state.panes.map(function (pane) {
          return _react2.default.createElement(
            TabPane,
            { tab: pane.title, key: pane.key },
            pane.content
          );
        })
      );
    }
  }]);

  return RoutesTabs;
}(_react.Component);

RoutesTabs.contextTypes = {
  router: _propTypes2.default.shape({
    route: _propTypes2.default.object.isRequired
  }).isRequired
};

RoutesTabs.propTypes = {
  children: _propTypes2.default.node,
  location: _propTypes2.default.object,
  history: _propTypes2.default.object.isRequired
};

exports.default = RoutesTabs;