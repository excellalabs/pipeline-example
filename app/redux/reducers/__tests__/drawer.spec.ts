
import * as freeze from 'deep-freeze'

import ToggleDrawer, { type as toggleDrawer } from '../../actions/toggleDrawer'
import reducer, { INITIAL_STATE as INITIAL } from '../drawer'
const INITIAL_STATE = freeze(INITIAL)

describe('default', () => {
  it('should return the initial state if no previous state was passed in', () => {
    const actual = reducer(undefined, { type: '' })
    expect(actual).toEqual(INITIAL_STATE)
  })
})

describe(toggleDrawer, () => {
  it(`should set the value as false if passed in`, () => {
    const expectedResult = false
    const actual = reducer(freeze({ open: true }), ToggleDrawer({ open: expectedResult }))
    expect(actual.open).toEqual(expectedResult)
  })
  it(`should set the value as true if passed in`, () => {
    const expectedResult = true
    const actual = reducer(freeze({ open: false }), ToggleDrawer({ open: expectedResult }))
    expect(actual.open).toEqual(expectedResult)
  })
})
