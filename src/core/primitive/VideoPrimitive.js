/**
 * @Author: Caven
 * @Date: 2020-11-09 20:04:30
 */

const { Overlay, State, Transform, Parse } = DC

const { Cesium } = DC.Namespace

class VideoPrimitive extends Overlay {
  constructor(positions, asynchronous = true) {
    super()
    this._positions = Parse.parsePositions(positions)
    this._delegate = new Cesium.GroundPrimitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: {}
      }),
      asynchronous
    })
    this._videoEl = undefined
    this.type = Overlay.getOverlayType('video_primitive')
    this._state = State.INITIALIZED
  }

  set positions(positions) {
    this._positions = Parse.parsePositions(positions)
    this._delegate.geometryInstances.geometry = Cesium.PolygonGeometry.fromPositions(
      {
        positions: Transform.transformWGS84ArrayToCartesianArray(
          this._positions
        ),
        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
      }
    )
    return this
  }

  get positions() {
    return this._positions
  }

  /**
   *
   * @private
   */
  _setAppearance() {
    this._delegate.appearance = new Cesium.EllipsoidSurfaceAppearance({
      material: Cesium.Material.fromType('Image', {
        image: this._videoEl
      })
    })
  }

  _mountedHook() {
    /**
     *  set the positions
     */
    this.positions = this._positions
  }

  /**
   *
   * @param el
   * @returns {VideoPrimitive}
   */
  setElement(el) {
    this._videoEl = el
    this._videoEl.play && this._videoEl.play()
    this._setAppearance()
    return this
  }
}

Overlay.registerType('video_primitive')

export default VideoPrimitive
