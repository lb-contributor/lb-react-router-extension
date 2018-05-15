import React, { Component } from 'react'
import PropTypes from 'prop-types'
import matchPath from 'react-router/matchPath'
import Tabs from 'lbc-wrapper/lib/tabs'

const { TabPane } = Tabs

class RoutesTabs extends Component {
  constructor() {
    super()
    this.matchRoute = this.matchRoute.bind(this)
    this.onChange = this.onChange.bind(this)
    this.addTab = this.addTab.bind(this)
    this.replaceTab = this.replaceTab.bind(this)
    this.remove = this.remove.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.subscribe = this.subscribe.bind(this)
    this.newTabIndex = 0
    this.state = {
      panes: [],
      activeKey: undefined,
      activePath: undefined,
    }
  }

  componentDidMount() {
    this.subscribe()
  }

  onEdit(targetKey, action) {
    this[action](targetKey)
  }

  onChange(activeKey) {
    this.state.panes.forEach((pane) => {
      if (pane.key === activeKey) {
        this.props.history.push(pane.path)
        this.setState({ activeKey })
      }
    })
  }

  subscribe() {
    const { tabstore } = this.props
    tabstore.subscribe(() => {
      const { type, payload } = tabstore.getState()
      if (type === 'LB_RR_E_CLOSE_TAB') {
        this.remove(this.state.activeKey)
      }
    })
  }

  matchRoute() {
    const { route } = this.context.router
    const { children, location, tabstore } = this.props
    const $location = location || route.location
    const panes = this.state.panes.filter(pane => pane.path === $location.pathname)
    if (panes.length > 0 && panes[0] !== undefined) {
      if (this.state.activePath !== this.context.router.route.location.pathname) {
        const { key, path } = panes[0]
        this.setState({ activeKey: key, activePath: path })
      }
      return
    }
    let match
    let child

    React.Children.forEach(children, (element) => {
      if (!React.isValidElement(element)) return

      const element$props = element.props
      const pathProp = element$props.path
      const {
        exact, strict, sensitive, from,
      } = element$props

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
      this.replaceTab(element)
    } else {
      this.addTab(element)
    }
  }

  replaceTab(content) {
    if (content === null) {
      return
    }
    const { panes, activeKey } = this.state
    const activePath = this.context.router.route.location.pathname
    const $panes = panes.map((pane) => {
      if (pane.key === activeKey) {
        return {
          key: activeKey,
          title: content.props.title || 'New Tab',
          content,
          path: activePath,
        }
      }
      return pane
    })
    this.setState({ panes: $panes, activePath })
    this.props.tabstore.dispatch({
      type: 'LB_RR_E_SET_ISNEWTAB',
      payload: true,
    })
  }

  addTab(content) {
    if (content === null) {
      return
    }
    const { panes } = this.state
    const activeKey = `tab$${this.newTabIndex++}`
    const activePath = this.context.router.route.location.pathname
    panes.push({
      key: activeKey,
      title: content.props.title || 'New Tab',
      content,
      path: activePath,
    })
    this.setState({ panes, activeKey, activePath })
  }

  remove(targetKey) {
    const { panes } = this.state
    if (panes.length === 1) {
      return
    }
    let lastIndex
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
        if (lastIndex < 0) {
          lastIndex = 0
        }
      }
    })
    const $panes = panes.filter(pane => pane.key !== targetKey)
    const $activeKey = $panes[lastIndex].key
    const $pathname = $panes[lastIndex].path
    if ($panes.length > 0) {
      this.props.history.push($pathname)
    }
    this.setState({ panes: $panes, activeKey: $activeKey })
  }

  render() {
    this.matchRoute()
    return (
      <Tabs hideAdd onChange={this.onChange} activeKey={this.state.activeKey} type={this.state.panes.length > 1 ? 'editable-card' : 'card'} onEdit={this.onEdit}>
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
