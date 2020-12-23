# DC-Overlay

<p>
<img src="https://img.shields.io/badge/license-Apache%202-blue"/>
<img src="https://img.shields.io/github/package-json/v/dvgis/dc-overlay?color=orange&logo=github" />
<img src="https://img.shields.io/npm/dw/@dvgis/dc-overlay?logo=npm"/>
</p>

[**🇨🇳 中文**](./README_zh.md) | [**🇬🇧English**](./README.md)

> DC-SDK 要素包

> [主页](http://dc.dvgis.cn)

## 安装

`CDN`

```html
<!--基础包-->
<script src="libs/dc-sdk/dc.base.min.js"></script>
<!--核心包-->
<script src="libs/dc-sdk/dc.core.min.js"></script>
<!--要素包-->
<script src="libs/dc-overlay/dc.overlay.min.js"></script>
<!--主要样式-->
<link href="libs/dc-sdk/dc.core.min.css" rel="stylesheet" type="text/css" />
```

`NPM / YARN`

```shell
   yarn add @dvgis/dc-sdk @dvgis/dc-overlay
   npm install @dvgis/dc-sdk @dvgis/dc-overlay
```

```js
import DC from 'dvgis/dc-sdk/dist/dc.base.min' //基础包
import DcCore from 'dvgis/dc-sdk/dist/dc.core.min' //核心包
import DcOverlay from 'dvgis/dc-overlay/dist/dc.overlay.min' //核心包
import 'dvgis/dc-sdk/dist/dc.core.min.css' // 主要样式
```

## 配置

`Webpack`

```js
 // webpack.config.js

const path = require('path')
const CopywebpackPlugin = require('copy-webpack-plugin')
const dvgisDist = './node_modules/@dvgis'

module.exports = {
  // 其他配置
  resolve: {
    alias: {
      dvgis: path.resolve(__dirname, dvgisDist)
    }
  },
  plugins:[
    new CopyWebpackPlugin([
      {  
        from: path.join(dvgisDist, 'dc-sdk/dist/resources'),
        to: 'libs/dc-sdk/resources' 
      }
    ])
  ]
}
```

`Vue2.x`

```js
// vue.config.js

const path = require('path')
const CopywebpackPlugin = require('copy-webpack-plugin')
const dvgisDist = './node_modules/@dvgis'

module.exports = {
  // 其他配置
  chainWebpack: config => {
    config.resolve.alias.set('dvgis', path.resolve(__dirname, dvgisDist))
    config.plugin('copy').use(CopywebpackPlugin, [
      [
        {
          from: path.join(dvgisDist, 'dc-sdk/dist/resources'),
          to: 'libs/dc-sdk/resources'
        }
      ]
    ])
  }
}
```

`Vue3.x`

```js
// vue.config.js

const path = require('path')
const CopywebpackPlugin = require('copy-webpack-plugin')
const dvgisDist = './node_modules/@dvgis'

module.exports = {
  // 其他配置
  chainWebpack: config => {
    config.resolve.alias.set('dvgis', path.resolve(__dirname, dvgisDist))
    config.plugin('copy').use(CopywebpackPlugin, [
      {
        patterns: [
          {
            from: path.join(dvgisDist, 'dc-sdk/dist/resources'),
            to: path.join(__dirname, 'dist', 'libs/dc-sdk/resources'),
          },
        ],
      }
    ])
  }
}
```

## 开始

```js
DC.use(DcCore)
DC.use(DcOverlay)
DC.ready(() => {
  let viewer = new DC.Viewer(divId) // divId 为一个div节点的Id属性值，如果不传入，会无法初始化3D场景
})
```

## 文档

[DC Api](https://resource.dvgis.cn/dc-api/)

[Cesium-Api](https://cesium.com/docs/cesiumjs-ref-doc/)

## 示例

| ![picture](http://dc.dvgis.cn/examples/images/overlay/point_custom.png)  | ![picture](http://dc.dvgis.cn/examples/images/overlay/label_custom.png) | ![picture](http://dc.dvgis.cn/examples/images/overlay/wall.png) | ![picture](http://dc.dvgis.cn/examples/images/overlay/wall_trail.gif) |
| :---------------------------------------------------------------: | :-----------------------------------------------------------------------------: | :---------------------------------------------------------------------: | :-------------------------------------------------------------------: |

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
