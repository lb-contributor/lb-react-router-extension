# lb-react-router-extension

这是一个单页程序在`tabs`中多开窗口，对`react-router`进行扩展的程序。

## 依赖
* react `^15.4.2`
* react-router `^4.2.0`
* redux `^3.7.2`
* lbc-wrapper `^0.0.12`

## 安装

确认您的环境满足上述要求后，您可以通过`npm`或`yarn`来安装

```bash
$ yarn add lb-react-router-extension  # or `npm install --save lb-react-router-extension`
```

## 如何使用

``` js
// 在react组件中导入
import renderTabs from 'lb-react-router-extension'

...

<div>
  {renderTabs(this.props.route.routes, this.props)} // 在jsx代码中使用renderTabs替代原renderRoutes来加载路由组件
</div>

...

```

### 辅助对象

通过`renderTabs`方法加载的子组件中会默认传入`props`一个相关辅助操作的对象`tabhelper`, 使用方法如下：

#### goto

``` js
 this.props.tabhelper.goto(path, isNewTab) // tab导航跳转方法
```
|`Parameters` |type      |Description|
|-------------|----------|-----------|
|`path`       |string    |页面相对路径|
|`isNewTab`   |boolean   |是否在新tab打开。若值为false则把新页面刷新到当前tab，true则会新打开一个tab，默认为true|

#### goback

``` js
 this.props.tabhelper.goback() // tab导航返回
```

#### closetab

``` js
 this.props.tabhelper.closetab() // 关闭当前tab
```

#### dispatch

``` js
 this.props.tabhelper.dispatch(type, payload) // 发送事件到其他tab页
```

|`Parameters` |type      |Description|
|-------------|----------|-----------|
|`type`       |string    |自定义事件类型|
|`payload`    |any       |需要传递的数据|

#### subscribe

``` js
 // 订阅其他tab页发送的事件
 this.props.tabhelper.subscribe(function(type, payload) {
	
 }) 
```

|`Parameters` |type      |Description|
|-------------|----------|-----------|
|`type`       |string    |自定义事件类型|
|`payload`    |any       |需要接收的数据|
