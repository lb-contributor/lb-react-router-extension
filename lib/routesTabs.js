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

var _tabs = require('./tabs');

var _tabs2 = _interopRequireDefault(_tabs);

require('./routesTabs.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPane = _tabs2.default.TabPane;

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
    _this.closesamepathtab = _this.closesamepathtab.bind(_this);
    _this.onEdit = _this.onEdit.bind(_this);
    _this.subscribe = _this.subscribe.bind(_this);
    _this.closeothertabs = _this.closeothertabs.bind(_this);
    _this.setActive = _this.setActive.bind(_this);
    _this.newTabIndex = 0;
    _this.state = {
      panes: [],
      active: {
        previous: {
          key: undefined,
          path: undefined,
          search: undefined
        },
        current: {
          key: undefined,
          path: undefined,
          search: undefined
        }
      }
    };
    _this.activeCallbackFuncs = {};
    return _this;
  }

  _createClass(RoutesTabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.subscribe();
    }
  }, {
    key: 'setActive',
    value: function setActive(key, path, search, panes) {
      this.setState(Object.assign({
        active: {
          previous: {
            key: this.state.active.current.key,
            path: this.state.active.current.path,
            search: this.state.active.current.search
          },
          current: {
            key: key,
            path: path,
            search: search
          }
        }
      }, panes || {}));
    }
  }, {
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
          var key = pane.key,
              path = pane.path,
              search = pane.search;

          _this2.props.history.push(path + search);
          _this2.setActive(key, path, search);
          _this2.activeCallbackFuncs.hasOwnProperty(path) && _this2.activeCallbackFuncs[path]();
        }
      });
    }
  }, {
    key: 'subscribe',
    value: function subscribe() {
      var _this3 = this;

      var tabstore = this.props.tabstore;

      tabstore.subscribe(function () {
        var _tabstore$getState = tabstore.getState(),
            type = _tabstore$getState.type,
            payload = _tabstore$getState.payload;

        if (type === 'LB_RR_E_CLOSE_TAB') {
          _this3.remove(_this3.state.active.current.key);
        }
        if (type === 'LB_RR_E_CLOSE_OTHER_SAME_PATH_TAB') {
          _this3.closesamepathtab(_this3.state.active.current.path, _this3.state.active.current.search);
        }
        if (type === 'LB_RR_E_ACTIVE_CALL_BACK') {
          _this3.activeCallbackFuncs[payload.path] = payload.cb;
        }
        if (type === 'LB_RR_E_CLEAR_ACTIVE_CALL_BACK') {
          _this3.state.panes.some(function (pane) {
            return pane.path === payload.path && delete _this3.activeCallbackFuncs[pane.path];
          });
        }
        if (type === 'LB_RR_E_CLOSE_OTHER_TABS') {
          _this3.closeothertabs(payload);
        }
      });
    }
  }, {
    key: 'matchRoute',
    value: function matchRoute() {
      var route = this.context.router.route;
      var _props = this.props,
          children = _props.children,
          location = _props.location,
          tabstore = _props.tabstore;

      var $location = location || route.location;
      var panes = this.state.panes.filter(function (pane) {
        return pane.path === $location.pathname && $location.search === pane.search;
      });
      var ignorepath = false;
      if (panes.length > 0 && panes[0] !== undefined) {
        if (this.state.active.current.path !== this.context.router.route.location.pathname) {
          var _panes$ = panes[0],
              key = _panes$.key,
              path = _panes$.path,
              search = _panes$.search;

          this.setActive(key, path, search);
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
      if (!tabstore.getState().isNewTab) {
        this.replaceTab(element, $location);
      } else {
        this.addTab(element, $location);
      }
    }
  }, {
    key: 'replaceTab',
    value: function replaceTab(content, location) {
      if (content === null) {
        return;
      }
      var _state = this.state,
          panes = _state.panes,
          active = _state.active;

      var activePath = this.context.router.route.location.pathname;
      var $panes = panes.map(function (pane) {
        if (pane.key === active.current.key) {
          return {
            key: active.current.key,
            title: content.props.title || 'New Tab',
            content: content,
            path: activePath,
            search: location.search
          };
        }
        return pane;
      });
      this.setActive(active.current.key, activePath, location.search, $panes);
      this.props.tabstore.dispatch({
        type: 'LB_RR_E_SET_ISNEWTAB',
        payload: true
      });
    }
  }, {
    key: 'addTab',
    value: function addTab(content, location) {
      if (content === null) {
        return;
      }
      var panes = this.state.panes;

      var key = 'tab$' + this.newTabIndex++;
      var path = this.context.router.route.location.pathname;
      panes.push({
        key: key,
        title: content.props.title || 'New Tab',
        content: content,
        path: path,
        search: location.search
      });
      this.setActive(key, path, location.search, panes);
    }
  }, {
    key: 'remove',
    value: function remove(targetKey) {
      var _this4 = this;

      var panes = this.state.panes;

      if (panes.length === 1) {
        return;
      }
      var $panes = panes.filter(function (pane) {
        return pane.key !== targetKey;
      });
      panes.some(function (pane) {
        return pane.key === targetKey && delete _this4.activeCallbackFuncs[pane.path];
      });
      if ($panes.length > 0) {
        var activeKey = this.state.active.previous.key;
        // const activePath = this.state.active.previous.path
        // const activeSearch = this.state.active.previous.search
        // this.props.history.push(activePath + activeSearch)
        this.onChange(activeKey);
        this.setState({ panes: $panes });
      }
    }
  }, {
    key: 'closesamepathtab',
    value: function closesamepathtab(targetPath, targetSearch) {
      var samenum = 0;
      var panes = this.state.panes.filter(function (pane) {
        if (pane.path !== targetPath) {
          return true;
        }
        samenum++;
        if (pane.search !== targetSearch) {
          return false;
        }

        return true;
      });
      this.setState({ panes: panes });
    }
  }, {
    key: 'closeothertabs',
    value: function closeothertabs(key) {
      this.onChange(key);
      var panes = this.state.panes.filter(function (pane) {
        if (pane.key === key) {
          return true;
        }
        return false;
      });
      this.setState({ panes: panes });
    }
  }, {
    key: 'render',
    value: function render() {
      this.matchRoute();
      return _react2.default.createElement(
        _tabs2.default,
        {
          className: 'vfc-tabs-router',
          hideAdd: true,
          onChange: this.onChange,
          activeKey: this.state.active.current.key,
          type: this.state.panes.length > 1 ? 'editable-card' : 'card',
          onEdit: this.onEdit,
          tabstore: this.props.tabstore
        },
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
  history: _propTypes2.default.object.isRequired,
  tabstore: _propTypes2.default.object.isRequired
};

exports.default = RoutesTabs;