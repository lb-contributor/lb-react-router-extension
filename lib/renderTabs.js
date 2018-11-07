'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _routesTabs = require('./routesTabs');

var _routesTabs2 = _interopRequireDefault(_routesTabs);

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createAction(actionType) {
  return function (value) {
    return {
      type: actionType,
      payload: value
    };
  };
}

var _closetab = createAction('LB_RR_E_CLOSE_TAB');
var _closeothersamepathtab = createAction('LB_RR_E_CLOSE_OTHER_SAME_PATH_TAB');
var setIsNewTab = createAction('LB_RR_E_SET_ISNEWTAB');
var _activeCallback = createAction('LB_RR_E_ACTIVE_CALL_BACK');
var clearActiveCallback = createAction('LB_RR_E_CLEAR_ACTIVE_CALL_BACK');

var tabstore = (0, _redux.createStore)(function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { isNewTab: true, menuList: [] };
  var action = arguments[1];

  switch (action.type) {
    case 'LB_RR_E_SET_ISNEWTAB':
      return Object.assign({}, state, action, {
        isNewTab: action.payload
      });
    case 'LB_RR_E_SET_MENULIST':
      return Object.assign({}, state, action, {
        menuList: action.payload
      });
    default:
      return Object.assign({}, state, action);
  }
});

var tabContainer = function (_React$Component) {
  _inherits(tabContainer, _React$Component);

  function tabContainer() {
    _classCallCheck(this, tabContainer);

    return _possibleConstructorReturn(this, (tabContainer.__proto__ || Object.getPrototypeOf(tabContainer)).apply(this, arguments));
  }

  _createClass(tabContainer, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var render = this.props.render;

      if (render) return render(this.props);
      return null;
    }
  }]);

  return tabContainer;
}(_react2.default.Component);

tabContainer.propTypes = {
  render: _propTypes2.default.func.isRequired
};

var renderTabs = function renderTabs(routes) {
  var extraProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return routes ? _react2.default.createElement(_routesTabs2.default, Object.assign({}, extraProps, { tabstore: tabstore }), routes.map(function (route, i) {
    return _react2.default.createElement(tabContainer, {
      key: route.key || i,
      title: route.title,
      path: route.path,
      exact: route.exact,
      strict: route.strict,
      render: function render(props) {
        return _react2.default.createElement(route.component, Object.assign({}, props, extraProps, {
          route: route,
          tabhelper: {
            activeCallback: function activeCallback(cb) {
              tabstore.dispatch(_activeCallback({ path: route.path, cb: cb }));
              return function () {
                return tabstore.dispatch(clearActiveCallback({ path: route.path, cb: cb }));
              };
            },
            goto: function goto(path) {
              var isNewTab = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

              tabstore.dispatch(setIsNewTab(isNewTab));
              extraProps.history.push(path);
            },
            goback: function goback() {
              var isNewTab = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

              tabstore.dispatch(setIsNewTab(isNewTab));
              extraProps.history.goBack();
            },
            closetab: function closetab() {
              tabstore.dispatch(_closetab());
            },
            closeothersamepathtab: function closeothersamepathtab() {
              tabstore.dispatch(_closeothersamepathtab());
            },
            getsearch: function getsearch() {
              var args = {};
              var query = extraProps.history.location.search.substring(1);
              var pairs = query.split("&");
              for (var _i = 0; _i < pairs.length; _i++) {
                var pos = pairs[_i].indexOf("=");
                if (pos == -1) continue;
                var name = pairs[_i].substring(0, pos);
                var value = pairs[_i].substring(pos + 1);
                value = decodeURIComponent(value);
                args[name] = value;
              }
              return args;
            },
            dispatch: function dispatch(type, payload) {
              tabstore.dispatch({
                type: type,
                payload: payload
              });
            },
            subscribe: function subscribe(cb) {
              return tabstore.subscribe(function () {
                var _tabstore$getState = tabstore.getState(),
                    type = _tabstore$getState.type,
                    payload = _tabstore$getState.payload;

                cb(type, payload);
              });
            },
            getTabState: function getTabState() {
              return tabstore.getState();
            }
          }
        }));
      }
    });
  })) : null;
};

exports.default = renderTabs;