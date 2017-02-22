
import * as React from 'react'
import { connect } from 'react-redux'
import { AppBar } from 'material-ui'

import { State } from '../redux/types'
import { Metrics } from '../constants'
import { ToggleDrawer } from '../redux/actions'

type HeaderProps = HeaderStateProps & HeaderDispatchProps

export class HeaderContainer extends React.Component<HeaderProps, {}> {
  render () {
    const leftPadding = this.props.drawerOpen && !this.props.isBelowDrawerBreakpoint ? Metrics.drawerWidth : undefined
    return (
      <AppBar title='Kitty' onLeftIconButtonTouchTap={() => this.props.toggleDrawer(!this.props.drawerOpen)} style={{ marginLeft: leftPadding }} />
    )
  }
}

interface HeaderStateProps {
  drawerOpen: boolean
  isBelowDrawerBreakpoint: boolean
}

const stateToProps = (state: State): HeaderStateProps => {
  return {
    drawerOpen: state.drawer.open,
    isBelowDrawerBreakpoint: state.window.isBelowDrawerBreakpoint
  }
}

interface HeaderDispatchProps {
  toggleDrawer (open: boolean)
}

const dispatchToProps = (dispatch): HeaderDispatchProps => {
  return {
    toggleDrawer: (open: boolean) => dispatch(ToggleDrawer({ open }))
  }
}

export default connect(stateToProps, dispatchToProps)(HeaderContainer)
