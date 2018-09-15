import _extends from 'babel-runtime/helpers/extends';
import Icon from './index';
import * as React from 'react';

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
const customCache = new Set();
export default function create() {
  const options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let scriptUrl = options.scriptUrl,
    _options$extraCommonP = options.extraCommonProps,
    extraCommonProps = _options$extraCommonP === undefined ? {} : _options$extraCommonP;
    /**
     * DOM API required.
     * Make sure in browser environment.
     * The Custom Icon will create a <script/>
     * that loads SVG symbols and insert the SVG Element into the document body.
     */

  if (typeof document !== 'undefined' && typeof window !== 'undefined' && typeof document.createElement === 'function' && typeof scriptUrl === 'string' && scriptUrl.length && !customCache.has(scriptUrl)) {
    const script = document.createElement('script');
    script.setAttribute('src', `https:${scriptUrl}`);
    script.setAttribute('data-namespace', scriptUrl);
    customCache.add(scriptUrl);
    document.body.appendChild(script);
  }
  const Iconfont = function Iconfont(props) {
    let type = props.type,
      children = props.children,
      restProps = __rest(props, ['type', 'children']);
    // component > children > type


    let content = null;
    if (props.type) {
      content = React.createElement('use', { xlinkHref: `#${type}` });
    }
    if (children) {
      content = children;
    }
    return React.createElement(
      Icon,
      _extends({}, restProps, extraCommonProps),
      content,
    );
  };
  Iconfont.displayName = 'Iconfont';
  return Iconfont;
}
