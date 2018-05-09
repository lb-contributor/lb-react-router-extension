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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.isNewTab = true;

var renderTabs = function renderTabs(routes) {
  var extraProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return routes ? _react2.default.createElement(_routesTabs2.default, extraProps, routes.map(function (route, i) {
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

              window.isNewTab = isNewTab;
              extraProps.history.push(path);
            },
            goback: function goback() {
              var isNewTab = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

              window.isNewTab = isNewTab;
              extraProps.history.goBack();
            },
            closetab: function closetab() {
              console.log(_routesTabs2.default);
            }
          }
        }));
      }
    });
  })) : null;
};

exports.default = renderTabs;