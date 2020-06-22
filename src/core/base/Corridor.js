/*
 * @Author: Caven
 * @Date: 2020-04-11 12:58:17
 * @Last Modified by: Caven
 * @Last Modified time: 2020-06-22 22:42:56
 */

const { Overlay, Util, State, Transform, Parse } = DC

const { Cesium } = DC.Namespace

class Corridor extends Overlay {
  constructor(positions) {
    super()
    this._positions = Parse.parsePositions(positions)
    this._delegate = new Cesium.Entity({ corridor: {} })
    this.type = Overlay.getOverlayType('corridor')
    this._state = State.INITIALIZED
  }

  set positions(positions) {
    this._positions = Parse.parsePositions(positions)
    this._delegate.corridor.positions = Transform.transformWGS84ArrayToCartesianArray(
      this._positions
    )
    return this
  }

  get positions() {
    return this._positions
  }

  _mountedHook() {
    /**
     *  set the location
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
    Util.merge(this._delegate.corridor, this._style)
    return this
  }
}

Overlay.registerType('corridor')

export default Corridor
