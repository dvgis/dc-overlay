/**
 * @Author: Caven
 * @Date: 2020-12-31 11:05:32
 */

const { Overlay, State, Transform, Parse } = DC

const { Cesium } = DC.Namespace

class LineScanPrimitive extends Overlay {
  constructor(position, radius) {
    super()
    this._position = Parse.parsePosition(position)
    this._radius = radius
    this._delegate = new Cesium.GroundPrimitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: {}
      }),
      asynchronous: true
    })
    this._speed = 10
    this._color = Cesium.Color.WHITE
    this.type = Overlay.getOverlayType('line_scan_primitive')
    this._state = State.INITIALIZED
  }

  set position(position) {
    this._position = Parse.parsePosition(position)
    this._delegate.geometryInstances.geometry = new Cesium.EllipseGeometry({
      center: Transform.transformWGS84ToCartesian(this._position),
      semiMajorAxis: this._radius,
      semiMinorAxis: this._radius
    })

    return this
  }

  get position() {
    return this._position
  }

  set radius(radius) {
    this._radius = radius
    this._delegate.geometryInstances.geometry = new Cesium.EllipseGeometry({
      center: Transform.transformWGS84ToCartesian(this._position),
      semiMajorAxis: this._radius,
      semiMinorAxis: this._radius
    })

    return this
  }

  get radius() {
    return this._radius
  }

  /**
   *
   * @private
   */
  _setAppearance() {
    if (!this._style) {
      return
    }
    this._delegate.appearance = new Cesium.MaterialAppearance({
      material: Cesium.Material.fromType('LineScan', {
        color: this._color,
        speed: this._speed
      })
    })
  }

  _mountedHook() {
    /**
     *  set the position
     */
    this.position = this._position

    /**
     * set the appearance
     */
    !this._delegate.appearance && this._setAppearance()
  }

  /**
   * Sets Style
   * @param style
   * @returns {LineScanPrimitive}
   */
  setStyle(style = {}) {
    if (Object.keys(style).length === 0) {
      return this
    }
    this._style = style
    style.classificationType &&
      (this._delegate.classificationType = this._style.classificationType)
    style.color && (this._color = style.color)
    style.speed && (this._speed = style.speed)
    this._setAppearance()
    return this
  }
}

Overlay.registerType('line_scan_primitive')

export default LineScanPrimitive
