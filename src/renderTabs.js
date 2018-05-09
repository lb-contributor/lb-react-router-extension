import React from 'react'
import RoutesTabs from './routesTabs'
import Route from 'react-router/Route'

window.isNewTab = true

const renderTabs = (routes, extraProps = {}) =>
  (routes
    ? React.createElement(
      RoutesTabs,
      extraProps,
      routes.map((route, i) =>
        React.createElement(Route, {
          key: route.key || i,
          title: route.title,
          path: route.path,
          exact: route.exact,
          strict: route.strict,
          render: props => React.createElement(
            route.component,
            Object.assign({}, props, extraProps, {
              route,
              tabhelper: {
                goto: (path, isNewTab = true) => {
                  window.isNewTab = isNewTab
                  extraProps.history.push(path)
                },
                goback: (isNewTab = true) => {
                  window.isNewTab = isNewTab
                  extraProps.history.goBack()
                },
                closetab: () => {
                  console.log(RoutesTabs)
                },
              },
            }),
          ),
        })),
    )
    : null)

export default renderTabs
