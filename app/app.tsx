
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Root from './containers/root'
import Home from './containers/home'
import store from './store'

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

const App = () => (
  <Provider store={store}>
    <Root>
      <Router history={history}>
        <Route path='/' component={Home}>
        </Route>
      </Router>
    </Root>
  </Provider>
)

export default App
