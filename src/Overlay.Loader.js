/**
 * @Author: Caven
 * @Date: 2020-04-09 20:03:32
 */

import {
  Box,
  Corridor,
  Cylinder,
  Ellipse,
  Ellipsoid,
  Plane,
  PolylineVolume,
  Rectangle,
  Wall
} from './core/base'

import { CustomBillboard, CustomLabel } from './core/custom'

import {
  AttackArrow,
  DoubleArrow,
  FineArrow,
  GatheringPlace,
  TailedAttackArrow
} from './core/plot'

import {
  ElecEllipsoidPrimitive,
  FlowLinePrimitive,
  ScanCirclePrimitive,
  TrailLinePrimitive,
  VideoPrimitive,
  WaterPrimitive
} from './core/primitive'

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
  ElecEllipsoidPrimitive,
  FlowLinePrimitive,
  ScanCirclePrimitive,
  TrailLinePrimitive,
  VideoPrimitive,
  WaterPrimitive
}

DC.mixin(overlays)
