/**
 * @Author: Caven
 * @Date: 2020-07-28 18:37:59
 */

const { Position, Overlay, Util, State, Transform, Parse } = DC

const { Cesium } = DC.Namespace

class CustomLabel extends Overlay {
  constructor(position, text) {
    super()
    this._delegate = new Cesium.Entity({ label: {} })
    this._position = Parse.parsePosition(position)
    this._text = text
    this.type = Overlay.getOverlayType('custom_label')
    this._state = State.INITIALIZED
  }

  set position(position) {
    this._position = Parse.parsePosition(position)
    this._delegate.position = Transform.transformWGS84ToCartesian(
      this._position
    )
    return this
  }

  get position() {
    return this._position
  }

  set text(text) {
    this._text = text
    this._delegate.label.text = this._text
    return this
  }

  get text() {
    return this._text
  }

  _mountedHook() {
    /**
     * set the location
     */
    this.position = this._position
    /**
     *  initialize the Overlay parameter
     */
    this.text = this._text
  }

  /**
   *
   * @param {*} style
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    delete style['text']
    this._style = style
    Util.merge(this._delegate.label, this._style)
    return this
  }

  /**
   * Sets  VLine style
   * @param style
   * @returns {CustomLabel}
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
   * Sets bottom circle
   * @param radius
   * @param style
   * @param rotateAmount
   * @returns {CustomLabel}
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

Overlay.registerType('custom_label')

export default CustomLabel
