import React from 'react'
import PropTypes from 'prop-types'
import RoutesTabs from './routesTabs'
import { createStore } from 'redux'

function createAction(actionType) {
  return value => ({
    type: actionType,
    payload: value,
  })
}

const closetab = createAction('LB_RR_E_CLOSE_TAB')
const closeothersamepathtab = createAction('LB_RR_E_CLOSE_OTHER_SAME_PATH_TAB')
const setIsNewTab = createAction('LB_RR_E_SET_ISNEWTAB')
const activeCallback = createAction('LB_RR_E_ACTIVE_CALL_BACK')
const clearActiveCallback = createAction('LB_RR_E_CLEAR_ACTIVE_CALL_BACK')

const tabstore = createStore((state = { isNewTab: true, menuList: [] }, action) => {
  switch (action.type) {
    case 'LB_RR_E_SET_ISNEWTAB':
      return Object.assign({}, state, action, {
        isNewTab: action.payload,
      })
    case 'LB_RR_E_SET_MENULIST':
      return Object.assign({}, state, action, {
        menuList: action.payload,
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
    const { render } = this.props
    if (render) return render(this.props)
    return null
  }
}

tabContainer.propTypes = {
  render: PropTypes.func.isRequired,
}

const renderTabs = (routes, extraProps = {}) =>
  (routes
    ? React.createElement(
      RoutesTabs,
      Object.assign({}, extraProps, { tabstore }),
      routes.map((route, i) =>
        React.createElement(tabContainer, {
          key: route.key || i,
          title: route.title,
          path: route.path,
          exact: route.exact,
          strict: route.strict,
          render: props =>
            React.createElement(
                route.component,
                Object.assign({}, props, extraProps, {
                  route,
                  tabhelper: {
                    activeCallback: (cb) => {
                      tabstore.dispatch(activeCallback({path: route.path, cb}))
                      return () => tabstore.dispatch(clearActiveCallback({path: route.path, cb}))
                    },
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
                    closeothersamepathtab: ()=> {
                      tabstore.dispatch(closeothersamepathtab())
                    },
                    getsearch: () => {
                      let args = {};
                      const query = extraProps.history.location.search.substring(1);
                      const pairs = query.split("&");
                      for(let i = 0;i < pairs.length; i++){
                          const pos = pairs[i].indexOf("=");
                          if(pos == -1) continue;
                          const name = pairs[i].substring(0, pos);
                          let value = pairs[i].substring(pos + 1);
                          value = decodeURIComponent(value);
                          args[name] = value;
                      }
                      return args;
                    },
                    dispatch: (type, payload) => {
                      tabstore.dispatch({
                        type,
                        payload,
                      })
                    },
                    subscribe: (cb) => {
                      return tabstore.subscribe(() => {
                        const { type, payload } = tabstore.getState()
                        cb(type, payload)
                      })
                    },
                    getTabState: () => {
                      return tabstore.getState()
                    },
                  },
                }),
              ),
        })),
    )
    : null)

export default renderTabs
