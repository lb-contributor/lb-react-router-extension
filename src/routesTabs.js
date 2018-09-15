import React, { Component } from 'react'
import PropTypes from 'prop-types'
import matchPath from 'react-router/matchPath'
import Tabs from './tabs'
import './routesTabs.css'

const { TabPane } = Tabs

class RoutesTabs extends Component {
  constructor() {
    super()
    this.matchRoute = this.matchRoute.bind(this)
    this.onChange = this.onChange.bind(this)
    this.addTab = this.addTab.bind(this)
    this.replaceTab = this.replaceTab.bind(this)
    this.remove = this.remove.bind(this)
    this.closesamepathtab = this.closesamepathtab.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.subscribe = this.subscribe.bind(this)
    this.closeothertabs = this.closeothertabs.bind(this)
    this.setActive = this.setActive.bind(this)
    this.newTabIndex = 0
    this.state = {
      panes: [],
      active: {
        previous: {
          key: undefined,
          path: undefined,
          search: undefined,
        },
        current: {
          key: undefined,
          path: undefined,
          search: undefined,
        },
      },
    }
    this.activeCallbackFuncs = {}
  }

  componentDidMount() {
    this.subscribe()
  }

  setActive(key, path, search, panes) {
    this.setState(Object.assign({
      active: {
        previous: {
          key: this.state.active.current.key,
          path: this.state.active.current.path,
          search: this.state.active.current.search,
        },
        current: {
          key,
          path,
          search,
        },
      },
    }, panes || {}))
  }

  onEdit(targetKey, action) {
    this[action](targetKey)
  }

  onChange(activeKey) {
    this.state.panes.forEach((pane) => {
      if (pane.key === activeKey) {
        const {key, path, search} = pane
        this.props.history.push(path + search)
        this.setActive(key, path, search)
        this.activeCallbackFuncs.hasOwnProperty(path) && this.activeCallbackFuncs[path]()
      }
    })
  }

  subscribe() {
    const { tabstore } = this.props
    tabstore.subscribe(() => {
      const { type, payload } = tabstore.getState()
      if (type === 'LB_RR_E_CLOSE_TAB') {
        this.remove(this.state.active.current.key)
      }
      if (type === 'LB_RR_E_CLOSE_OTHER_SAME_PATH_TAB') {
        this.closesamepathtab(this.state.active.current.path, this.state.active.current.search)
      }
      if (type === 'LB_RR_E_ACTIVE_CALL_BACK') {
        this.activeCallbackFuncs[payload.path] = payload.cb
      }
      if (type === 'LB_RR_E_CLEAR_ACTIVE_CALL_BACK') {
        this.state.panes.some(pane => pane.path === payload.path && delete this.activeCallbackFuncs[pane.path])
      }
      if (type === 'LB_RR_E_CLOSE_OTHER_TABS') {
        this.closeothertabs(payload)
      }
    })
  }

  matchRoute() {
    const { route } = this.context.router
    const { children, location, tabstore } = this.props
    const $location = location || route.location
    const panes = this.state.panes.filter(pane => pane.path === $location.pathname && $location.search === pane.search)
    const ignorepath = false
    if (panes.length > 0 && panes[0] !== undefined) {
      if (this.state.active.current.path !== this.context.router.route.location.pathname) {
        const { key, path, search } = panes[0]
        this.setActive(key, path, search)
      }
      return
    }
    let match
    let child

    React.Children.forEach(children, (element) => {
      if (!React.isValidElement(element)) return

      const element$props = element.props
      const pathProp = element$props.path
      const { exact, strict, sensitive, from } = element$props

      const path = pathProp || from

      if (match == null) {
        child = element
        match = path
          ? matchPath($location.pathname, {
            path,
            exact,
            strict,
            sensitive,
          })
          : route.match
      }
    })

    const element = match ? React.cloneElement(child, { location: $location, computedMatch: match }) : null
    if (!tabstore.getState().isNewTab) {
      this.replaceTab(element, $location)
    } else {
      this.addTab(element, $location)
    }
  }

  replaceTab(content, location) {
    if (content === null) {
      return
    }
    const { panes, active } = this.state
    const activePath = this.context.router.route.location.pathname
    const $panes = panes.map((pane) => {
      if (pane.key === active.current.key) {
        return {
          key: active.current.key,
          title: content.props.title || 'New Tab',
          content,
          path: activePath,
          search: location.search,
        }
      }
      return pane
    })
    this.setActive(active.current.key, activePath, location.search, $panes)
    this.props.tabstore.dispatch({
      type: 'LB_RR_E_SET_ISNEWTAB',
      payload: true,
    })
  }

  addTab(content, location) {
    if (content === null) {
      return
    }
    const { panes } = this.state
    const key = `tab$${this.newTabIndex++}`
    const path = this.context.router.route.location.pathname
    const search = location.search
    panes.push({
      key,
      title: content.props.title || 'New Tab',
      content,
      path,
      search,
    })
    this.setActive(key, path, search, panes)
  }

  remove(targetKey) {
    const { panes } = this.state
    if (panes.length === 1) {
      return
    }
    const $panes = panes.filter(pane => pane.key !== targetKey)
    panes.some(pane => pane.key === targetKey && delete this.activeCallbackFuncs[pane.path])
    if ($panes.length > 0) {
      let activeKey = this.state.active.previous.key
      const hasHistory = $panes.some(pane => pane.key === activeKey)
      if (!hasHistory) {
        const lastIndex = $panes.length - 1
        activeKey = $panes[lastIndex].key
      }
      // const activePath = this.state.active.previous.path
      // const activeSearch = this.state.active.previous.search
      // this.props.history.push(activePath + activeSearch)
      this.onChange(activeKey)
      this.setState({ panes: $panes })
    }
  }

  closesamepathtab(targetPath, targetSearch) {
    let samenum = 0
    const panes = this.state.panes.filter((pane) => {
      if (pane.path !== targetPath) {
        return true
      }
      samenum++
      if (pane.search !== targetSearch) {
        return false
      }

      return true
    })
    this.setState({ panes })
  }

  closeothertabs(key) {
    this.onChange(key)
    const panes = this.state.panes.filter(pane => {
      if (pane.key === key) {
        return true
      }
      return false
    })
    this.setState({ panes})
  }

  render() {
    this.matchRoute()
    return (
      <Tabs
        className="vfc-tabs-router"
        hideAdd
        onChange={this.onChange}
        activeKey={this.state.active.current.key}
        type={this.state.panes.length > 1 ? 'editable-card' : 'card'}
        onEdit={this.onEdit}
        tabstore={this.props.tabstore}
      >
        {this.state.panes.map(pane => (
          <TabPane tab={pane.title} key={pane.key}>
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    )
  }
}

RoutesTabs.contextTypes = {
  router: PropTypes.shape({
    route: PropTypes.object.isRequired,
  }).isRequired,
}

RoutesTabs.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  history: PropTypes.object.isRequired,
  tabstore: PropTypes.object.isRequired,
}

export default RoutesTabs
