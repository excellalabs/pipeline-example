
import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { State } from '../redux/types'
import { SetName } from '../redux/actions'
import Hello from '../components/hello'

export type HomeProps = HomeStateProps & HomeDispatchProps

export class HomeContainer extends React.Component<HomeProps, {}> {
  render () {
    return (
      <div>
        <Hello name={this.props.name} changeName={this.props.setName} />
      </div>
    )
  }
}

export interface HomeStateProps {
  name: string
}

const stateToProps = (state: State): HomeStateProps => {
  return {
    name: state.hello.name
  }
}

export interface HomeDispatchProps {
  setName: (name: string) => void
}

const dispatchToProps = (dispatch: Dispatch<State>): HomeDispatchProps => {
  return {
    setName: (name: string) => dispatch(SetName({ name }))
  }
}

export default connect(stateToProps, dispatchToProps)(HomeContainer)
