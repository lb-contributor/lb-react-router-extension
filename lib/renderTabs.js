'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _routesTabs = require('./routesTabs');

var _routesTabs2 = _interopRequireDefault(_routesTabs);

var _Route = require('react-router/Route');

var _Route2 = _interopRequireDefault(_Route);

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createAction(actionType) {
  return function (value) {
    return {
      type: actionType,
      payload: value
    };
  };
}

var _closetab = createAction('LB_RR_E_CLOSE_TAB');
var setIsNewTab = createAction('LB_RR_E_SET_ISNEWTAB');
var tabstore = (0, _redux.createStore)(function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isNewTab: true
  };
  var action = arguments[1];

  switch (action.type) {
    case 'LB_RR_E_SET_ISNEWTAB':
      return Object.assign({}, state, action, {
        isNewTab: action.payload
      });
    default:
      return Object.assign({}, state, action);
  }
});

var renderTabs = function renderTabs(routes) {
  var extraProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return routes ? _react2.default.createElement(_routesTabs2.default, Object.assign({}, extraProps, { tabstore: tabstore }), routes.map(function (route, i) {
    return _react2.default.createElement(_Route2.default, {
      key: route.key || i,
      title: route.title,
      path: route.path,
      exact: route.exact,
      strict: route.strict,
      render: function render(props) {
        return _react2.default.createElement(route.component, Object.assign({}, props, extraProps, {
          route: route,
          tabhelper: {
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
            dispatch: function dispatch(type, payload) {
              tabstore.dispatch({
                type: type,
                payload: payload
              });
            },
            subscribe: function subscribe(cb) {
              tabstore.subscribe(function () {
                var _tabstore$getState = tabstore.getState(),
                    type = _tabstore$getState.type,
                    payload = _tabstore$getState.payload;

                cb(type, payload);
              });
            }
          }
        }));
      }
    });
  })) : null;
};

exports.default = renderTabs;