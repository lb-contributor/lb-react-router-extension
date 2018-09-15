import _extends from 'babel-runtime/helpers/extends'
import _typeof from 'babel-runtime/helpers/typeof'
import _classCallCheck from 'babel-runtime/helpers/classCallCheck'
import _createClass from 'babel-runtime/helpers/createClass'
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn'
import _inherits from 'babel-runtime/helpers/inherits'
import * as React from 'react'
import Icon from '../icon'
import ScrollableInkTabBar from './rc-tabs/ScrollableInkTabBar'

const TabBar = (function (_React$Component) {
  _inherits(TabBar, _React$Component)

  function TabBar() {
    _classCallCheck(this, TabBar)

    return _possibleConstructorReturn(this, (TabBar.__proto__ || Object.getPrototypeOf(TabBar)).apply(this, arguments))
  }

  _createClass(TabBar, [
    {
      key: 'render',
      value: function render() {
        let _props = this.props,
          tabBarStyle = _props.tabBarStyle,
          _props$animated = _props.animated,
          animated = _props$animated === undefined ? true : _props$animated,
          renderTabBar = _props.renderTabBar,
          tabBarExtraContent = _props.tabBarExtraContent,
          tabPosition = _props.tabPosition,
          prefixCls = _props.prefixCls

        const inkBarAnimated =
          (typeof animated === 'undefined' ? 'undefined' : _typeof(animated)) === 'object' ? animated.inkBar : animated
        const isVertical = tabPosition === 'left' || tabPosition === 'right'
        const prevIconType = isVertical ? 'up' : 'left'
        const nextIconType = isVertical ? 'down' : 'right'
        const prevIcon = React.createElement(
          'span',
          { className: `${prefixCls}-tab-prev-icon` },
          React.createElement(Icon, { type: prevIconType, className: `${prefixCls}-tab-prev-icon-target` }),
        )
        const nextIcon = React.createElement(
          'span',
          { className: `${prefixCls}-tab-next-icon` },
          React.createElement(Icon, { type: nextIconType, className: `${prefixCls}-tab-next-icon-target` }),
        )
        const renderProps = _extends({}, this.props, {
          inkBarAnimated,
          extraContent: tabBarExtraContent,
          style: tabBarStyle,
          prevIcon,
          nextIcon,
        })
        let RenderTabBar = void 0
        if (renderTabBar) {
          RenderTabBar = renderTabBar(renderProps, ScrollableInkTabBar)
        } else {
          RenderTabBar = React.createElement(ScrollableInkTabBar, renderProps)
        }
        return React.cloneElement(RenderTabBar)
      },
    },
  ])

  return TabBar
}(React.Component))

export default TabBar
