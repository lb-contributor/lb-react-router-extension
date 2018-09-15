import React from 'react'
import warning from 'warning'
import PropTypes from 'prop-types'
import Dropdown from 'lbc-wrapper/lib/dropdown'
import MenuWrapper, { Item as MenuItem } from 'lbc-wrapper/lib/menu'

export default class TabBarTabsNode extends React.Component {
  closeOtherTabs(key) {
    this.props.tabstore.dispatch({
      type: 'LB_RR_E_CLOSE_OTHER_TABS',
      payload: key,
    })
  }
  render() {
    const { panels: children, activeKey, prefixCls, tabBarGutter } = this.props
    const rst = []

    React.Children.forEach(children, (child, index) => {
      if (!child) {
        return
      }
      const key = child.key
      let cls = activeKey === key ? `${prefixCls}-tab-active` : ''
      cls += ` ${prefixCls}-tab`
      let events = {}
      if (child.props.disabled) {
        cls += ` ${prefixCls}-tab-disabled`
      } else {
        events = {
          onClick: this.props.onTabClick.bind(this, key),
        }
      }
      const ref = {}
      if (activeKey === key) {
        ref.ref = this.props.saveRef('activeTab')
      }
      warning('tab' in child.props, 'There must be `tab` property on children of Tabs.')
      rst.push(<Dropdown
        key={key}
        overlay={
          <MenuWrapper onClick={this.closeOtherTabs.bind(this, key)}>
            <MenuItem>
              <span>关闭其他标签</span>
            </MenuItem>
          </MenuWrapper>
          }
        trigger={['contextMenu']}
      >
        <div
          role="tab"
          aria-disabled={child.props.disabled ? 'true' : 'false'}
          aria-selected={activeKey === key ? 'true' : 'false'}
          {...events}
          className={cls}
          key={key}
          style={{ marginRight: tabBarGutter && index === children.length - 1 ? 0 : tabBarGutter }}
          {...ref}
        >
          {child.props.tab}
        </div>
               </Dropdown>)
    })

    return <div>{rst}</div>
  }
}

TabBarTabsNode.propTypes = {
  activeKey: PropTypes.string,
  panels: PropTypes.node,
  prefixCls: PropTypes.string,
  tabBarGutter: PropTypes.number,
  onTabClick: PropTypes.func,
  saveRef: PropTypes.func,
}

TabBarTabsNode.defaultProps = {
  panels: [],
  prefixCls: [],
  tabBarGutter: null,
  onTabClick: () => {},
  saveRef: () => {},
}
