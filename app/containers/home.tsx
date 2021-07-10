
import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { State } from '../redux/types'

export type HomeProps = HomeStateProps & HomeDispatchProps

export class HomeContainer extends React.Component<HomeProps, {}> {
  render () {
    return (
      <div>
        Asdf
      </div>
    )
  }
}

export interface HomeStateProps {

}

const stateToProps = (state: State): HomeStateProps => {
  return {
  }
}

export interface HomeDispatchProps {
}

const dispatchToProps = (dispatch: Dispatch<State>): HomeDispatchProps => {
  return {
  }
}

export default connect(stateToProps, dispatchToProps)(HomeContainer)
