import React, { Component } from 'react'
import PropTypes from 'prop-types'
import matchPath from 'react-router/matchPath'
import { Tabs } from 'lbc-wrapper'

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
    this.newTabIndex = 0
    this.state = {
      panes: [],
      activeKey: undefined,
      activePath: undefined,
    }
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

  matchRoute() {
    const { route } = this.context.router
    const { children, location } = this.props
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
    if (!window.isNewTab) {
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
    const $panes = panes.map(pane=>{
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
    window.isNewTab = true
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
    const { activeKey, panes } = this.state
    if (panes.length === 1) {
      return
    }
    let lastIndex
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const $panes = panes.filter(pane => pane.key !== targetKey)
    let $pathname
    let $activeKey
    if (lastIndex >= 0 && activeKey === targetKey) {
      $activeKey = $panes[lastIndex].key
      $pathname = $panes[lastIndex].path
    }
    if ($panes.length > 0) {
      this.props.history.push($pathname)
    }
    this.setState({ panes: $panes, activeKey: $activeKey })
  }

  closetab(route) {
    console.log(route)
  }

  render() {
    this.matchRoute()
    return (
      <Tabs hideAdd onChange={this.onChange} activeKey={this.state.activeKey} type={this.state.panes.length>1?'editable-card':'card'} onEdit={this.onEdit}>
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
}

export default RoutesTabs
