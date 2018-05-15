import React from 'react'
import RoutesTabs from './routesTabs'
import Route from 'react-router/Route'
import { createStore } from 'redux'

function createAction(actionType) {
  return value => ({
    type: actionType,
    payload: value,
  })
}

const closetab = createAction('LB_RR_E_CLOSE_TAB')
const setIsNewTab = createAction('LB_RR_E_SET_ISNEWTAB')
const tabstore = createStore((state = { isNewTab: true }, action) => {
  switch (action.type) {
    case 'LB_RR_E_SET_ISNEWTAB':
      return Object.assign({}, state, action, {
        isNewTab: action.payload,
      })
    default:
      return Object.assign({}, state, action)
  }
})

class tabContainer extends React.Component {
  shouldComponentUpdate() {
    return false
  }
  render() {
    return <div>{this.props.children}</div>
  }
}

const renderTabs = (routes, extraProps = {}) =>
  (routes
    ? React.createElement(
      RoutesTabs,
      Object.assign({}, extraProps, { tabstore }),
      routes.map((route, i) =>
        React.createElement(Route, {
          key: route.key || i,
          title: route.title,
          path: route.path,
          exact: route.exact,
          strict: route.strict,
          render: props =>
            React.createElement(tabContainer, {}, [
              React.createElement(
                route.component,
                Object.assign({}, props, extraProps, {
                  route,
                  tabhelper: {
                    goto: (path, isNewTab = true) => {
                      tabstore.dispatch(setIsNewTab(isNewTab))
                      extraProps.history.push(path)
                    },
                    goback: (isNewTab = true) => {
                      tabstore.dispatch(setIsNewTab(isNewTab))
                      extraProps.history.goBack()
                    },
                    closetab: () => {
                      tabstore.dispatch(closetab())
                    },
                    dispatch: (type, payload) => {
                      tabstore.dispatch({
                        type,
                        payload,
                      })
                    },
                    subscribe: (cb) => {
                      tabstore.subscribe(() => {
                        const { type, payload } = tabstore.getState()
                        cb(type, payload)
                      })
                    },
                  },
                }),
              ),
            ]),
        })),
    )
    : null)

export default renderTabs
