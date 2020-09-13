/**
 * @Author: Caven
 * @Date: 2020-04-09 20:02:37
 */

const install = function(DC) {
  if (!DC || !DC.init) {
    throw new Error('Plot: Missing DC Base')
  }

  if (!DC.ready) {
    throw new Error('Plot: Missing DC Core')
  }

  DC.init(() => {
    require('./Overlay.Loader')
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.DC) {
  install(window.DC)
}

export default {
  install
}
