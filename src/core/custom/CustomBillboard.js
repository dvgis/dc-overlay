/*
 * @Author: Caven
 * @Date: 2020-02-12 21:44:24
 * @Last Modified by: Caven
 * @Last Modified time: 2020-06-22 23:08:27
 */

const { Billboard, Position, State, Transform } = DC

const { Cesium } = DC.Namespace

class CustomBillboard extends Billboard {
  constructor(position, icon) {
    super(position, icon)
    this.type = Overlay.getOverlayType('custom_billboard')
    this._state = State.INITIALIZED
  }

  /**
   *
   * @param {*} style
   */
  setVLine(style) {
    if (this._position.alt > 0 && !this._delegate.polyline) {
      let position = new Position(this._position.lng, this._position.lat, 0)
      this._delegate.polyline = {
        ...style,
        positions: Transform.transformWGS84ArrayToCartesianArray([
          position,
          this._position
        ])
      }
    }
    return this
  }

  /**
   *
   * @param {*} radius
   * @param {*} style
   * @param {*} rotateAmount
   */
  setBottomCircle(radius, style, rotateAmount) {
    let stRotation = 0
    let amount = rotateAmount || 0
    this._delegate.ellipse = {
      ...style,
      semiMajorAxis: radius,
      semiMinorAxis: radius,
      stRotation: new Cesium.CallbackProperty(time => {
        if (amount > 0) {
          stRotation += amount
          if (stRotation >= 360) {
            stRotation = 0
          }
        }
        return stRotation
      })
    }
    return this
  }
}

Overlay.registerType('custom_billboard')

export default CustomBillboard
