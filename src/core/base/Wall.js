/*
 * @Author: Caven
 * @Date: 2020-02-25 18:28:36
 * @Last Modified by: Caven
 * @Last Modified time: 2020-06-25 09:13:22
 */

const { Overlay, Util, State, Transform, Parse } = DC

const { Cesium } = DC.Namespace

class Wall extends Overlay {
  constructor(positions) {
    super()
    this._positions = Parse.parsePositions(positions)
    this._delegate = new Cesium.Entity({ wall: {} })
    this.type = Overlay.getOverlayType('wall')
    this._state = State.INITIALIZED
  }

  set positions(positions) {
    this._positions = Parse.parsePositions(positions)
    this._delegate.wall.positions = Transform.transformWGS84ArrayToCartesianArray(
      this._positions
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
    if (Object.keys(style).length === 0) {
      return this
    }
    delete style['positions']
    this._style = style
    Util.merge(this._delegate.wall, this._style)
    return this
  }
}

Overlay.registerType('wall')

export default Wall
