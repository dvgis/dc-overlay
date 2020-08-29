/**
 * @Author: Caven
 * @Date: 2020-08-29 22:51:36
 */

import AttackArrow from './AttackArrow'

const { Overlay, State, Transform, Parse } = DC

const {
  isClockWise,
  mid,
  distance,
  getBaseLength,
  getThirdPoint,
  getQBSplinePoints
} = DC.PlotUtil

const { Cesium } = DC.Namespace

class TailedAttackArrow extends AttackArrow {
  constructor(positions) {
    super(positions)
    this._delegate = new Cesium.Entity({ polygon: {} })
    this.headHeightFactor = 0.18
    this.headWidthFactor = 0.3
    this.neckHeightFactor = 0.85
    this.neckWidthFactor = 0.15
    this.tailWidthFactor = 0.1
    this.headTailFactor = 0.8
    this.swallowTailFactor = 1
    this.type = Overlay.getOverlayType('tailed_attack_arrow')
    this._state = State.INITIALIZED
  }

  set positions(positions) {
    this._positions = Parse.parsePositions(positions)
    this._delegate.polygon.hierarchy = this._getHierarchy()
    return this
  }

  get positions() {
    return this._positions
  }

  _getHierarchy() {
    let pnts = Parse.parsePolygonCoordToArray(this._positions)[0]
    let tailLeft = pnts[0]
    let tailRight = pnts[1]
    if (isClockWise(pnts[0], pnts[1], pnts[2])) {
      tailLeft = pnts[1]
      tailRight = pnts[0]
    }
    let midTail = mid(tailLeft, tailRight)
    let bonePnts = [midTail].concat(pnts.slice(2))
    let headPnts = this._getArrowHeadPoints(bonePnts, tailLeft, tailRight)
    let neckLeft = headPnts[0]
    let neckRight = headPnts[4]
    let tailWidth = distance(tailLeft, tailRight)
    let allLen = getBaseLength(bonePnts)
    let len = allLen * this.tailWidthFactor * this.swallowTailFactor
    let swallowTailPnt = getThirdPoint(bonePnts[1], bonePnts[0], 0, len, true)
    let factor = tailWidth / allLen
    let bodyPnts = this._getArrowBodyPoints(
      bonePnts,
      neckLeft,
      neckRight,
      factor
    )
    let count = bodyPnts.length
    let leftPnts = [tailLeft].concat(bodyPnts.slice(0, count / 2))
    leftPnts.push(neckLeft)
    let rightPnts = [tailRight].concat(bodyPnts.slice(count / 2, count))
    rightPnts.push(neckRight)
    leftPnts = getQBSplinePoints(leftPnts)
    rightPnts = getQBSplinePoints(rightPnts)
    return new Cesium.PolygonHierarchy(
      Transform.transformWGS84ArrayToCartesianArray(
        Parse.parsePositions(
          leftPnts.concat(headPnts, rightPnts.reverse(), [
            swallowTailPnt,
            leftPnts[0]
          ])
        )
      )
    )
  }
}

Overlay.registerType('tailed_attack_arrow')

export default TailedAttackArrow
