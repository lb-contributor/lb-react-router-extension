import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import * as React from 'react';
import classNames from 'classnames';
import * as allIcons from '@ant-design/icons/lib/dist';
import ReactIcon from '@ant-design/icons-react';
import createFromIconfontCN from './IconFont';
import { svgBaseProps, withThemeSuffix, removeTypeTheme, getThemeFromTypeName } from './utils';
import warning from '../_util/warning';
import { getTwoToneColor, setTwoToneColor } from './twoTonePrimaryColor';

const __rest = this && this.__rest || function (s, e) {
  const t = {};
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  } if (s != null && typeof Object.getOwnPropertySymbols === 'function') {
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }
  } return t;
};
// Initial setting
ReactIcon.add(..._toConsumableArray(Object.keys(allIcons).map(key => allIcons[key])));
setTwoToneColor('#1890ff');
let defaultTheme = 'outlined';
let dangerousTheme;
const Icon = function Icon(props) {
  let _classNames;

  let className = props.className,
    type = props.type,
    Component = props.component,
    viewBox = props.viewBox,
    spin = props.spin,
    children = props.children,
    theme = props.theme,
    twoToneColor = props.twoToneColor,
    restProps = __rest(props, ['className', 'type', 'component', 'viewBox', 'spin', 'children', 'theme', 'twoToneColor']);

  warning(Boolean(type || Component || children), 'Icon should have `type` prop or `component` prop or `children`.');
  const classString = classNames((_classNames = {}, _defineProperty(_classNames, 'anticon', true), _defineProperty(_classNames, `anticon-${type}`, Boolean(type)), _classNames), className);
  const svgClassString = classNames(_defineProperty({}, 'anticon-spin', !!spin || type === 'loading'));
  let innerNode = void 0;
  // component > children > type
  if (Component) {
    const innerSvgProps = _extends({}, svgBaseProps, { className: svgClassString, viewBox });
    if (!viewBox) {
      delete innerSvgProps.viewBox;
    }
    innerNode = React.createElement(
      Component,
      innerSvgProps,
      children,
    );
  }
  if (children) {
    warning(Boolean(viewBox) || React.Children.count(children) === 1 && React.Children.only(children).type === 'use', 'Make sure that you provide correct `viewBox`' + ' prop (default `0 0 1024 1024`) to the icon.');
    const _innerSvgProps = _extends({}, svgBaseProps, { className: svgClassString });
    innerNode = React.createElement(
      'svg',
      _extends({}, _innerSvgProps, { viewBox }),
      children,
    );
  }
  if (typeof type === 'string') {
    let computedType = type;
    if (theme) {
      const alreadyHaveTheme = getThemeFromTypeName(type);
      warning(!alreadyHaveTheme, `This icon already has a theme '${alreadyHaveTheme}'.` + ` The prop 'theme' ${theme} will be ignored.`);
    }
    computedType = withThemeSuffix(removeTypeTheme(type), dangerousTheme || theme || defaultTheme);
    innerNode = React.createElement(ReactIcon, { className: svgClassString, type: computedType, primaryColor: twoToneColor });
  }
  return React.createElement(
    'i',
    _extends({}, restProps, { className: classString }),
    innerNode,
  );
};
function unstable_ChangeThemeOfIconsDangerously(theme) {
  warning(false, 'You are using the unstable method \'Icon.unstable_ChangeThemeOfAllIconsDangerously\', ' + `make sure that all the icons with theme '${theme}' display correctly.`);
  dangerousTheme = theme;
}
function unstable_ChangeDefaultThemeOfIcons(theme) {
  warning(false, 'You are using the unstable method \'Icon.unstable_ChangeDefaultThemeOfIcons\', ' + `make sure that all the icons with theme '${theme}' display correctly.`);
  defaultTheme = theme;
}
Icon.displayName = 'Icon';
Icon.createFromIconfontCN = createFromIconfontCN;
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;
export default Icon;
