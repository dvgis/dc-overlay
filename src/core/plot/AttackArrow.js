/**
 * @Author: Caven
 * @Date: 2020-08-29 21:45:14
 */

const { Overlay, Util, State, Transform, Parse } = DC

const {
  distance,
  getBaseLength,
  getThirdPoint,
  wholeDistance,
  getAngleOfThreePoints,
  isClockWise,
  mid,
  getQBSplinePoints
} = DC.PlotUtil

const { Cesium } = DC.Namespace

const HALF_PI = Math.PI / 2

class AttackArrow extends Overlay {
  constructor(positions) {
    super()
    this._positions = Parse.parsePositions(positions)
    this._delegate = new Cesium.Entity({ polygon: {} })
    this.headHeightFactor = 0.18
    this.headWidthFactor = 0.3
    this.neckHeightFactor = 0.85
    this.neckWidthFactor = 0.15
    this.headTailFactor = 0.8
    this.type = Overlay.getOverlayType('attack_arrow')
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

  _getArrowHeadPoints(points, tailLeft, tailRight) {
    let len = getBaseLength(points)
    let headHeight = len * this.headHeightFactor
    let headPnt = points[points.length - 1]
    len = distance(headPnt, points[points.length - 2])
    let tailWidth = distance(tailLeft, tailRight)
    if (headHeight > tailWidth * this.headTailFactor) {
      headHeight = tailWidth * this.headTailFactor
    }
    let headWidth = headHeight * this.headWidthFactor
    let neckWidth = headHeight * this.neckWidthFactor
    headHeight = headHeight > len ? len : headHeight
    let neckHeight = headHeight * this.neckHeightFactor
    let headEndPnt = getThirdPoint(
      points[points.length - 2],
      headPnt,
      0,
      headHeight,
      true
    )
    let neckEndPnt = getThirdPoint(
      points[points.length - 2],
      headPnt,
      0,
      neckHeight,
      true
    )
    let headLeft = getThirdPoint(headPnt, headEndPnt, HALF_PI, headWidth, false)
    let headRight = getThirdPoint(headPnt, headEndPnt, HALF_PI, headWidth, true)
    let neckLeft = getThirdPoint(headPnt, neckEndPnt, HALF_PI, neckWidth, false)
    let neckRight = getThirdPoint(headPnt, neckEndPnt, HALF_PI, neckWidth, true)
    return [neckLeft, headLeft, headPnt, headRight, neckRight]
  }

  _getArrowBodyPoints(points, neckLeft, neckRight, tailWidthFactor) {
    let allLen = wholeDistance(points)
    let len = getBaseLength(points)
    let tailWidth = len * tailWidthFactor
    let neckWidth = distance(neckLeft, neckRight)
    let widthDif = (tailWidth - neckWidth) / 2
    let tempLen = 0
    let leftBodyPnts = []
    let rightBodyPnts = []
    for (let i = 1; i < points.length - 1; i++) {
      let angle =
        getAngleOfThreePoints(points[i - 1], points[i], points[i + 1]) / 2
      tempLen += distance(points[i - 1], points[i])
      let w = (tailWidth / 2 - (tempLen / allLen) * widthDif) / Math.sin(angle)
      let left = getThirdPoint(
        points[i - 1],
        points[i],
        Math.PI - angle,
        w,
        true
      )
      let right = getThirdPoint(points[i - 1], points[i], angle, w, false)
      leftBodyPnts.push(left)
      rightBodyPnts.push(right)
    }
    return leftBodyPnts.concat(rightBodyPnts)
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
    // 计算箭头
    let headPnts = this._getArrowHeadPoints(bonePnts, tailLeft, tailRight)
    let neckLeft = headPnts[0]
    let neckRight = headPnts[4]
    let tailWidthFactor =
      distance(tailLeft, tailRight) / getBaseLength(bonePnts)
    // 计算箭身
    let bodyPnts = this._getArrowBodyPoints(
      bonePnts,
      neckLeft,
      neckRight,
      tailWidthFactor
    )
    // 整合
    let count = bodyPnts.length
    let leftPnts = [tailLeft].concat(bodyPnts.slice(0, count / 2))
    leftPnts.push(neckLeft)
    let rightPnts = [tailRight].concat(bodyPnts.slice(count / 2, count))
    rightPnts.push(neckRight)
    leftPnts = getQBSplinePoints(leftPnts)
    rightPnts = getQBSplinePoints(rightPnts)
    return new Cesium.PolygonHierarchy(
      Transform.transformWGS84ArrayToCartesianArray(
        Parse.parsePositions(leftPnts.concat(headPnts, rightPnts.reverse()))
      )
    )
  }

  _mountedHook() {
    /**
     *  set the location
     */
    this.positions = this._positions
  }

  /**
   *
   * @param text
   * @param textStyle
   * @returns {AttackArrow}
   */
  setLabel(text, textStyle) {
    return this
  }

  /**
   * Sets Style
   * @param style
   * @returns {AttackArrow}
   */
  setStyle(style) {
    if (Object.keys(style).length === 0) {
      return this
    }
    delete style['positions']
    this._style = style
    Util.merge(this._delegate.polygon, this._style)
    return this
  }
}

Overlay.registerType('attack_arrow')

export default AttackArrow
