
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as injectTapEventPlugin from 'react-tap-event-plugin'

import App from './app'
import './init'

injectTapEventPlugin()

if ('serviceWorker' in navigator) {
  (navigator as any).serviceWorker.register('service-worker.js')
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
