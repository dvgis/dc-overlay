/*
 * @Author: Caven
 * @Date: 2020-04-14 11:10:00
 * @Last Modified by: Caven
 * @Last Modified time: 2020-06-25 09:12:58
 */
const { Overlay, Util, State, Transform, Parse } = DC

const { Cesium } = DC.Namespace

class PolylineVolume extends Overlay {
  constructor(positions, shape) {
    super()
    this._positions = Parse.parsePositions(positions)
    this._shape = shape || []
    this._delegate = new Cesium.Entity({ polylineVolume: {} })
    this.type = Overlay.getOverlayType('polyline_volume')
    this._state = State.INITIALIZED
  }

  set positions(positions) {
    this._positions = Parse.parsePositions(positions)
    this._delegate.polylineVolume.positions = Transform.transformWGS84ArrayToCartesianArray(
      this._positions
    )
    return this
  }

  get positions() {
    return this._positions
  }

  set shape(shape) {
    this._shape = shape || []
    this._delegate.polylineVolume.shap = this._shape
    return this
  }

  get shape() {
    return this._shape
  }

  _mountedHook() {
    /**
     * set the location
     */
    this.positions = this._positions

    /**
     *  initialize the Overlay parameter
     */
    this.shape = this._shape
  }

  /**
   *
   * @param {*} text
   * @param {*} textStyle
   */
  setLabel(text, textStyle) {
    return this
  }

  /**
   *
   * @param {*} style
   */
  setStyle(style) {
    if (Object.keys(style).length == 0) {
      return this
    }
    delete style['positions'] && delete style['shap']
    this._style = style
    Util.merge(this._delegate.polylineVolume, this._style)
    return this
  }
}

Overlay.registerType('polyline_volume')

export default PolylineVolume
