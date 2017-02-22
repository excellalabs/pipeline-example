
import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { Metrics } from '../constants'
import { State } from '../redux/types'
import Theme from './theme'
import Header from './headerContainer'
import SideNav from './sideNavContainer'

export type RootProps = RootStateProps & RootDispatchProps

export class HomeContainer extends React.Component<RootProps, {}> {
  render () {
    const leftPadding = this.props.padLeft ? Metrics.drawerWidth : 0
    return (
      <Theme>
        <SideNav />
        <Header />
        <div id='root' style={{marginLeft: leftPadding}}>
          <div style={{margin: '48px 72px'}}>
            {this.props.children}
          </div>
        </div>
      </Theme>
    )
  }
}

export interface RootStateProps {
  padLeft: boolean
}

const stateToProps = (state: State): RootStateProps => {
  return {
    padLeft: state.drawer.open && !state.window.isBelowDrawerBreakpoint
  }
}

export interface RootDispatchProps {
}

const dispatchToProps = (dispatch: Dispatch<State>): RootDispatchProps => {
  return {
  }
}

export default connect(stateToProps, dispatchToProps)(HomeContainer)
