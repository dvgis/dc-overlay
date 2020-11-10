/**
 * @Author: Caven
 * @Date: 2020-04-09 20:03:32
 */

import Box from './core/base/Box'
import Corridor from './core/base/Corridor'
import Cylinder from './core/base/Cylinder'
import Ellipse from './core/base/Ellipse'
import Ellipsoid from './core/base/Ellipsoid'
import Plane from './core/base/Plane'
import PolylineVolume from './core/base/PolylineVolume'
import Rectangle from './core/base/Rectangle'
import Wall from './core/base/Wall'
import CustomBillboard from './core/custom/CustomBillboard'
import CustomLabel from './core/custom/CustomLabel'
import AttackArrow from './core/plot/AttackArrow'
import DoubleArrow from './core/plot/DoubleArrow'
import FineArrow from './core/plot/FineArrow'
import GatheringPlace from './core/plot/GatheringPlace'
import TailedAttackArrow from './core/plot/TailedAttackArrow'
import WaterPrimitive from './core/primitive/WaterPrimitive'
import VideoPrimitive from './core/primitive/VideoPrimitive'

const overlays = {
  Box,
  Corridor,
  Cylinder,
  Ellipse,
  Ellipsoid,
  Plane,
  PolylineVolume,
  Rectangle,
  Wall,
  CustomBillboard,
  CustomLabel,
  AttackArrow,
  DoubleArrow,
  FineArrow,
  GatheringPlace,
  TailedAttackArrow,
  WaterPrimitive,
  VideoPrimitive
}

DC.mixin(overlays)
