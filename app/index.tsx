
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import reducer from './redux/rootReducer'
import Home from './containers/home'

const store = createStore(reducer)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Home}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)

if ('serviceWorker' in navigator) {
  (navigator as any).serviceWorker.register('service-worker.js')
}
