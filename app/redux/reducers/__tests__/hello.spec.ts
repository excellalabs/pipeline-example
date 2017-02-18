
import * as freeze from 'deep-freeze'

import { setName } from '../../actionTypes'
import reducer, { INITIAL_STATE as INITIAL } from '../hello'
const INITIAL_STATE = freeze(INITIAL)

describe('default', () => {
  it('should return the initial state if no previous state was passed in', () => {
    const actual = reducer(undefined, { type: '' })
    expect(actual).toEqual(INITIAL_STATE)
  })
})

describe(setName, () => {
  const names = ['John', 'Jacob', 'Jingleheimer', 'Schmidt']
  names.forEach(expectedName => {
    it(`should change name to ${expectedName}`, () => {
      const actual = reducer(INITIAL, { type: setName, name: expectedName })
      expect(actual.name).toEqual(expectedName)
    })
  })
})
