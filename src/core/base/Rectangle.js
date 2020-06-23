/*
 * @Author: Caven
 * @Date: 2020-04-14 11:10:00
 * @Last Modified by: Caven
 * @Last Modified time: 2020-06-23 10:30:16
 */
const { Overlay, Util, State, Transform, Parse } = DC

const { Cesium } = DC.Namespace

class Rectangle extends Overlay {
  constructor(positions) {
    super()
    this._positions = Parse.parsePositions(positions)
    this._delegate = new Cesium.Entity({ rectangle: {} })
    this.type = Overlay.getOverlayType('rectangle')
    this._state = State.INITIALIZED
  }

  set positions(positions) {
    this._positions = Parse.parsePositions(positions)
    this._delegate.rectangle.coordinates = Cesium.Rectangle.fromDegrees(
      this._positions[0]?.lng,
      this._positions[0]?.lat,
      this._positions[1]?.lng,
      this._positions[1]?.lat
    )
    return this
  }

  get positions() {
    return this._positions
  }

  _mountedHook() {
    /**
     * set the location
     */
    this.positions = this._positions
  }

  /**
   *
   * @param {*} style
   */
  setStyle(style) {
    if (Object.keys(style).length == 0) {
      return this
    }
    delete style['positions']
    this._style = style
    Util.merge(this._delegate.rectangle, this._style)
    return this
  }
}

Overlay.registerType('rectangle')

export default Rectangle
