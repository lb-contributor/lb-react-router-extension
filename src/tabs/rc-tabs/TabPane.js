import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getDataAttr } from './utils';

export default class TabPane extends React.Component {
  render() {
    const {
      id, className, destroyInactiveTabPane, active, forceRender,
      rootPrefixCls, style, children, placeholder, ...restProps,
    } = this.props;
    this._isActived = this._isActived || active;
    const prefixCls = `${rootPrefixCls}-tabpane`;
    const cls = classnames({
      [prefixCls]: 1,
      [`${prefixCls}-inactive`]: !active,
      [`${prefixCls}-active`]: active,
      [className]: className,
    });
    const isRender = destroyInactiveTabPane ? active : this._isActived;
    return (
      <div
        style={{height: this.props.TCH, ...style,}}
        role="tabpanel"
        aria-hidden={active ? 'false' : 'true'}
        className={cls}
        id={id}
        {...getDataAttr(restProps)}
      >
        {isRender || forceRender ? children : placeholder}
      </div>
    );
  }
}

TabPane.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  style: PropTypes.any,
  destroyInactiveTabPane: PropTypes.bool,
  forceRender: PropTypes.bool,
  placeholder: PropTypes.node,
  rootPrefixCls: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.string,
};

TabPane.defaultProps = {
  placeholder: null,
};