
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import Home from '../home'
import { State } from '../../redux/types'

const state: State = {
  drawer: {
    open: false
  }
}

const store = {
  getState: jest.fn(() => state),
  dispatch: jest.fn(),
  subscribe: jest.fn(),
  replaceReducer: jest.fn()
}

const setName = (name: string) => {
  //state.hello.name = name
}

xdescribe('snapshots', () => {
  it('should display the correct default name', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <Home />
      </Provider>
    )
    expect(tree).toMatchSnapshot()
  })

  it('should display the correct name when it is set', () => {
    setName('John Doe')
    const tree = renderer.create(
      <Provider store={store}>
        <Home />
      </Provider>
    )
    expect(tree).toMatchSnapshot()
  })
})
