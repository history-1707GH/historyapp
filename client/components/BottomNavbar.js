import React, {Component} from 'react'
import { connect } from 'react-redux'
import FontIcon from 'material-ui/FontIcon'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import IconLocationOn from 'material-ui/svg-icons/communication/location-on'
import { teal500, teal900, white } from 'material-ui/styles/colors'
import InfoIcon from 'material-ui/svg-icons/action/info'
import AccountIcon from 'material-ui/svg-icons/action/account-box'
import RouteIcon from 'material-ui/svg-icons/maps/person-pin-circle'
import StarIcon from 'material-ui/svg-icons/action/stars'

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
export default class BottomNavbar extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper zDepth={1} >
        <BottomNavigation selectedIndex={this.state.selectedIndex} style={{backgroundColor:teal900, textDecorationColor:white}} >
          <BottomNavigationItem
            label="Account"
            
            icon={<AccountIcon color={white} />}
            onClick={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Routes"

            icon={<RouteIcon color={white} />}
            onClick={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Leaderboard"
            icon={<StarIcon color={white} />}          
            onClick={() => this.select(2)}
          />
          <BottomNavigationItem
          label="Info"          
          icon={<InfoIcon color={white} />}
          onClick={() => this.select(3)}
        />
        </BottomNavigation>
      </Paper>
    );
  }
}

// const mapState = null
// // state => {
// //   return {
// //       currentUser: state.user
// //   }
// // }

// const mapDispatch = null
// // (dispatch, ownProps) => {
// //   return {
// //       handleLogout: () => {
// //           dispatch(logOut(ownProps.history))
// //       }
// //   }
// // }

// export default connect(mapState, mapDispatch)(BottomNavbar)
