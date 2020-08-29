/**
 * @Author: Caven
 * @Date: 2020-08-29 22:38:10
 */

const { Overlay, Util, State, Transform, Parse } = DC

const { distance, getThirdPoint } = DC.PlotUtil

const { Cesium } = DC.Namespace

class StraightArrow extends Overlay {
  constructor(positions) {
    super()
    this._positions = Parse.parsePositions(positions)
    this._delegate = new Cesium.Entity({ polygon: {} })
    this.maxArrowLength = 3000000
    this.arrowLengthScale = 5
    this.type = Overlay.getOverlayType('straight_arrow')
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
    let pnt1 = pnts[0]
    let pnt2 = pnts[1]
    let distance = distance(pnt1, pnt2)
    let len = distance / this.arrowLengthScale
    len = len > this.maxArrowLength ? this.maxArrowLength : len
    let leftPnt = getThirdPoint(pnt1, pnt2, Math.PI / 6, len, false)
    let rightPnt = getThirdPoint(pnt1, pnt2, Math.PI / 6, len, true)
    return new Cesium.PolygonHierarchy(
      Transform.transformWGS84ArrayToCartesianArray(
        Parse.parsePositions([pnt1, leftPnt, pnt2, rightPnt])
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
   * @returns {StraightArrow}
   */
  setLabel(text, textStyle) {
    return this
  }

  /**
   * Sets Style
   * @param style
   * @returns {StraightArrow}
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

Overlay.registerType('straight_arrow')

export default StraightArrow
