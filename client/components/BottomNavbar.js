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
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'


class BottomNavbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      map: false,
      synopsis:false,
      headlines:false,
      archives:false,
      notes:false,
      routes:false,
      leaderboard:false,
      general:false,
      next:false
    }
  }
  state = {
    selectedIndex: 0,
  }
  static contextTypes = { router: React.PropTypes.object }

  select = (index) => this.setState({selectedIndex: index})

  handleCloseMap = () => this.setState({map:false})
  handleCloseSynopsis = () => this.setState({synopsis:false})
  handleCloseHeadlines = () => this.setState({headlines:false})
  handleCloseArchives = () => this.setState({archives:false})
  handleCloseNotes = () => this.setState({notes:false})
  handleCloseRoutes = () => this.setState({routes:false})
  handleCloseLeaderboard = () => this.setState({leaderboard:false})
  handleCloseGeneral = () => this.setState({general:false})
  handleCloseNext = () => this.setState({next:false})
   
  handleclickInfo = (index) => {
    this.setState({selectedIndex:index})
    const currentPath= this.props.location.pathname
    switch(currentPath){
      case('/map'): return this.setState({map:true})
      case('/synopsis'): return this.setState({synopsis:true})
      case('/archives'): return this.setState({archives:true})
      case('/headlines'): return this.setState({headlines:true})
      case('/notes'): return this.setState({notes:true})
      case('/routes'): return this.setState({routes:true})
      case('/leaderboard'): return this.setState({leaderboard:true})
      case('/next_experience'): return this.setState({next:true})
      default: return this.setState({general:true})
    }
  }

  render() {
    const actionMap = [<FlatButton label="OK" primary={true} onClick={this.handleCloseMap} />]
    const actionArchives = [<FlatButton label="OK" primary={true} onClick={this.handleCloseArchives} />]
    const actionHeadlines = [<FlatButton label="OK" primary={true} onClick={this.handleHeadlines} />]
    const actionSynopsis = [<FlatButton label="OK" primary={true} onClick={this.handleCloseSynopsis} />]
    const actionRoutes= [<FlatButton label="OK" primary={true} onClick={this.handleCloseRoutes} />]
    const actionGeneral = [<FlatButton label="OK" primary={true} onClick={this.handleCloseGeneral} />]
    const actionLeaderboard = [<FlatButton label="OK" primary={true} onClick={this.handleCloseLeaderboard} />]
    const actionNotes = [<FlatButton label="OK" primary={true} onClick={this.handleCloseLeaderboard} />]
    const actionNext = [<FlatButton label="OK" primary={true} onClick={this.handleCloseNext} />]
    return (
      <div>
        <div>
          <Dialog
            title={'More information:'}
            actions={actionMap}
            modal={false}
            open={this.state.map}
            onRequestClose={this.handleCloseMap}>Select a location to start. Navigate there & learn more!</Dialog>
          <Dialog
            title={'More information:'}
            actions={actionSynopsis}
            modal={false}
            open={this.state.synopsis}
            onRequestClose={this.handleCloseSynopsis}>Explore your destination! Check-in to unlock your next location and leave a note for other Meanderers! </Dialog>
          <Dialog
            title={'More information:'}
            actions={actionHeadlines}
            modal={false}
            open={this.state.headlines}
            onRequestClose={this.handleCloseHeadlines}>Read related news headlines from the New York Times</Dialog>
          <Dialog
            title={'More information:'}
            actions={actionArchives}
            modal={false}
            open={this.state.archives}
            onRequestClose={this.handleCloseArchives}>Peruse thru the archives of the New York Times. (*Requires subscription to NYT)</Dialog>
          <Dialog
            title={'More information:'}
            actions={actionNotes}
            modal={false}
            open={this.state.notes}
            onRequestClose={this.handleCloseNotes}>Read notes left by other Meanderers. Then, share your favorite or most interesting thing you learned!</Dialog>
          <Dialog
            title={'More information:'}
            actions={actionRoutes}
            modal={false}
            open={this.state.routes}
            onRequestClose={this.handleCloseRoutes}>Explore routes you've already taken or discover new routes recently completed by other users!</Dialog>
          <Dialog
            title={'More information:'}
            actions={actionLeaderboard}
            modal={false}
            open={this.state.leaderboard}
            onRequestClose={this.handleCloseLeaderboard}>Checkout who's on the leaderboard! Are you in the Top 10?</Dialog>
            <Dialog
            title={'Hello from Meander!'}
            actions={actionGeneral}
            modal={false}
            open={this.state.general}
            onRequestClose={this.handleCloseGeneral}>Turn your Everyday into a quest!  Explore the neighborhood’s gems while you dive into history.  Your interest and our algorithms will select your next location in this choose-your-own-adventure experience. </Dialog>
            <Dialog
            title={'More information:'}
            actions={actionNext}
            modal={false}
            open={this.state.next}
            onRequestClose={this.handleCloseNext}>You're well on your your way! Choose your next location and tap the info icon to learn more about why this location was chosen!</Dialog>
        </div>
        <Paper zDepth={1} style={{position:"fixed", bottom:0, zIndex:100}}>
          <BottomNavigation selectedIndex={this.state.selectedIndex} style={{backgroundColor:teal900, textDecorationColor:white}} >
          <NavLink to="/routes">
            <BottomNavigationItem
              label="Routes"

              icon={<RouteIcon color={white} />}
              onClick={() => this.select(0)}
            />
          </NavLink>
          <NavLink to="/leaderboard">
            <BottomNavigationItem
              label="Leaderboard"
              icon={<StarIcon color={white} />}          
              onClick={() => this.select(1)}
            />
          </NavLink>
            <BottomNavigationItem
            label="Info"          
            icon={<InfoIcon color={white} />}
            onClick={() => this.handleclickInfo(2)}
          />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}

export default withRouter(BottomNavbar)
