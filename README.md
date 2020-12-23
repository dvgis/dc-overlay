# DC-Overlay

<p>
<img src="https://img.shields.io/badge/license-Apache%202-blue"/>
<img src="https://img.shields.io/github/package-json/v/dvgis/dc-overlay?color=orange&logo=github" />
<img src="https://img.shields.io/npm/dw/@dvgis/dc-overlay?logo=npm"/>
</p>

[**🇨🇳 中文**](./README_zh.md) | [**🇬🇧English**](./README.md)

> DC-SDK overlay package

> [Home Page](http://dc.dvgis.cn)

## Installation

`CDN`

```html
<!--Basic Package-->
<script src="libs/dc-sdk/dc.base.min.js"></script>
<!--Core Package-->
<script src="libs/dc-sdk/dc.core.min.js"></script>
<!--Overlay Package-->
<script src="libs/dc-overlay/dc.overlay.min.js"></script>
<!--Main Style Sheet -->
<link href="libs/dc-sdk/dc.core.min.css" rel="stylesheet" type="text/css" />
```

`NPM / YARN`

```shell
   yarn add @dvgis/dc-sdk @dvgis/dc-overlay
   npm install @dvgis/dc-sdk @dvgis/dc-overlay
```

```js
import DC from 'dvgis/dc-sdk/dist/dc.base.min' //Basic Package
import DcCore from 'dvgis/dc-sdk/dist/dc.core.min' //Core Package
import DcOverlay from  'dvgis/dc-overlay/dist/dc.overlay.min' //Overlay Package
import 'dvgis/dc-sdk/dist/dc.core.min.css' // Main Style Sheet
```

## Setting

`Webpack`

```js
 // webpack.config.js

const path = require('path')
const CopywebpackPlugin = require('copy-webpack-plugin')
const dvgisDist = './node_modules/@dvgis'

module.exports = {
  // other settings
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
  // other settings
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
  // other settings
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

## Start

```js
DC.use(DcCore)
DC.use(DcOverlay)
DC.ready(() => {
  let viewer = new DC.Viewer(divId) // divId is the Id attribute value of a div node. If it is not passed in, the 3D scene cannot be initialized
})
```

## Documentation

[DC Api](https://resource.dvgis.cn/dc-api/)

[Cesium-Api](https://cesium.com/docs/cesiumjs-ref-doc/)

## Demo

| ![picture](http://dc.dvgis.cn/examples/images/overlay/point_custom.png)  | ![picture](http://dc.dvgis.cn/examples/images/overlay/label_custom.png) | ![picture](http://dc.dvgis.cn/examples/images/overlay/wall.png) | ![picture](http://dc.dvgis.cn/examples/images/overlay/wall_trail.gif) |
| :---------------------------------------------------------------: | :-----------------------------------------------------------------------------: | :---------------------------------------------------------------------: | :-------------------------------------------------------------------: |

## Copyright statement

```warning
1. The framework is a basic platform, completely open source, which can be modified and reconstructed by any individual or institution without our authorization.
2. We are not responsible for any problems arising from the modification of the framework by individuals and organizations.
3. Some industrial plug-ins and tools will be added in the later stage, and the code will be open source appropriately.
4. The package released by us may be used permanently and free of charge by any person or organization subject to:
  1) complete package reference;
  2) reserve this copyright information in the console output
We reserve the right of final interpretation of this copyright information.
```

## Thanks
