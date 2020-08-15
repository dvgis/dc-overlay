/**
 * @Author: Caven
 * @Date: 2020-04-14 20:46:23
 */

const { Overlay, Util, State, Parse } = DC

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
   * @param text
   * @param textStyle
   * @returns {Rectangle}
   */
  setLabel(text, textStyle) {
    return this
  }

  /**
   * Sets Style
   * @param style
   * @returns {Rectangle}
   */
  setStyle(style) {
    if (Object.keys(style).length === 0) {
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