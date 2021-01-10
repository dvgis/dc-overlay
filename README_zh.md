# DC-Overlay

<p>
<img src="https://img.shields.io/badge/license-Apache%202-blue"/>
<img src="https://img.shields.io/npm/v/@dvgis/dc-overlay?logo=npm&color=orange" />
<img src="https://img.shields.io/npm/dm/@dvgis/dc-overlay?logo=npm"/>
</p>

[**🇨🇳 中文**](./README_zh.md) | [**🇬🇧English**](./README.md)

> DC-SDK 要素包
 
# 主页

> http://dc.dvgis.cn

## 安装

`CDN`

```html
<!-- 要素包 -->
<script src="libs/dc-overlay/dc.overlay.min.js"></script>
```

`NPM / YARN`

```shell
yarn add @dvgis/dc-overlay
npm install @dvgis/dc-overlay
```

```js
import DcOverlay from 'dvgis/dc-overlay/dist/dc.overlay.min' //要素包
import 'dvgis/dc-sdk/dist/dc.core.min.css' // 主要样式
```

## 开始

```js
DC.use(DcOverlay)
```

## 文档

[DC Overlay Api](https://resource.dvgis.cn/dc-api/dc-overlay/)

## 示例

| ![picture](http://dc.dvgis.cn/examples/images/overlay/point_custom.png)  | ![picture](http://dc.dvgis.cn/examples/images/overlay/label_custom.png) | ![picture](http://dc.dvgis.cn/examples/images/overlay/wall.png) | ![picture](http://dc.dvgis.cn/examples/images/overlay/wall_trail.gif) |
| :---------------------------------------------------------------: | :-----------------------------------------------------------------------------: | :---------------------------------------------------------------------: | :-------------------------------------------------------------------: |
| ![picture](http://dc.dvgis.cn/examples/images/overlay/ellipsoid.png)  | ![picture](http://dc.dvgis.cn/examples/images/overlay/water.gif) | ![picture](http://dc.dvgis.cn/examples/images/overlay/plane.png) | ![picture](http://dc.dvgis.cn/examples/images/overlay/scan_circle.gif) |
## 版权声明

```warning
1.框架作为一个基础平台，代码开源，任何个人和机构可以修改、重构，无需经过我方授权。
2.任何个人和机构修改框架出现的问题，我方无需负责。
3.后期会添加一些行业性的插件和工具，代码会适量开源。
4.对于我方发布的程序包，任何个人和机构在遵守下列条件的前提下可以永久免费使用:
   1)程序包完整引用；
   2)保留此版权信息在控制台输出
我方保留对此版权信息的最终解释权。
```

## 感谢
