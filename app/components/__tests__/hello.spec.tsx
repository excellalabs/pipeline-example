
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import Hello from '../hello'

describe('snapshots', () => {
  it('should render the correct name of "world"', () => {
    const tree = (
      <Hello name='world' />
    )
    expect(tree).toMatchSnapshot()
  })
  it('should render the correct name of "james"', () => {
    const tree = (
      <Hello name='james' />
    )
    expect(tree).toMatchSnapshot()
  })
})
