/**
 * @Author: Caven
 * @Date: 2020-02-18 16:08:26
 */

const { Overlay, Util, State, Transform, Parse } = DC

const { Cesium } = DC.Namespace

class Plane extends Overlay {
  constructor(position, width, height, direction) {
    super()
    this._position = Parse.parsePosition(position)
    this._width = +width || 0
    this._height = +height || 0
    this._plane = new Cesium.Plane(Cesium.Cartesian3.clone(direction), 0.0)
    this._delegate = new Cesium.Entity({
      plane: {
        dimensions: {
          x: this._width,
          y: this._height
        }
      }
    })
    this.type = Overlay.getOverlayType('plane')
    this._state = State.INITIALIZED
  }

  set position(position) {
    this._position = Parse.parsePosition(position)
    this._delegate.position = Transform.transformWGS84ToCartesian(
      this._position
    )
    this._delegate.orientation = Cesium.Transforms.headingPitchRollQuaternion(
      Transform.transformWGS84ToCartesian(this._position),
      new Cesium.HeadingPitchRoll(
        Cesium.Math.toRadians(this._position.heading),
        Cesium.Math.toRadians(this._position.pitch),
        Cesium.Math.toRadians(this._position.roll)
      )
    )
    return this
  }

  get position() {
    return this._position
  }

  set width(width) {
    this._width = +width || 0
    this._delegate.plan.dimensions.x = this._width
    return this
  }

  get width() {
    return this._width
  }

  set height(height) {
    this._height = +height || 0
    this._delegate.plan.dimensions.y = this._height
    return this
  }

  get height() {
    return this._height
  }

  set direction(direction) {
    this._plane = new Cesium.Plane(direction, 0.0)
    this._delegate.plan.plane = new Cesium.Plane(direction, 0.0)
    return this
  }

  _mountedHook() {
    /**
     * set the location
     */
    this.position = this._position
    /**
     *  initialize the Overlay parameter
     */
    this.direction = this._direction
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
   * Sets Style
   * @param style
   * @returns {Plane}
   */
  setStyle(style) {
    if (Object.keys(style).length === 0) {
      return this
    }
    delete style['dimensions'] && delete ['plan']
    this._style = style
    Util.merge(this._delegate.plane, this._style)
    return this
  }
}

Overlay.registerType('plane')

export default Plane
