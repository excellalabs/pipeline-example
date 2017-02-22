
import { ChangeWindowWidth } from './redux/actions'
import store from './store'
import { Metrics } from './constants'


const throttle = function(type: string, name: string, target?: EventTarget) {
  target = target || window
  var running = false
  target.addEventListener(type, () => {
    if (running) { return }
    running = true
    requestAnimationFrame(function() {
      target.dispatchEvent(new CustomEvent(name))
      running = false
    })
  })
}

const optimizedResize = 'optimizedResize'

throttle('resize', optimizedResize);

const updateWindowWidth = () => {
  store.dispatch(ChangeWindowWidth({ windowWidth: window.innerWidth }))
}

window.addEventListener(optimizedResize, updateWindowWidth)
window.addEventListener('load', updateWindowWidth)
