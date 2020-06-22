/*
 * @Author: Caven
 * @Date: 2020-04-09 20:03:32
 * @Last Modified by: Caven
 * @Last Modified time: 2020-06-22 23:07:37
 */

import Box from './core/base/Box'
import Corridor from './core/base/Corridor'
import Cylinder from './core/base/Cylinder'
import Ellipse from './core/base/Ellipse'
import Ellipsoid from './core/base/Ellipsoid'
import Plane from './core/base/Plane'
import PolylineVolume from './core/base/PolylineVolume'
import Wall from './core/base/Wall'
import CustomBillboard from './core/custom/CustomBillboard'

const overlays = {
  Box,
  Corridor,
  Cylinder,
  Ellipse,
  Ellipsoid,
  Plane,
  PolylineVolume,
  Wall,
  CustomBillboard
}

DC.mixin(overlays)
