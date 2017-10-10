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


/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
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
      general:false
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
    return (
      <div>
        <div>
          <Dialog
            title={'Info: Map'}
            actions={actionMap}
            modal={false}
            open={this.state.map}
            onRequestClose={this.handleCloseMap}>Map info</Dialog>
          <Dialog
            title={'Info: Synopsis'}
            actions={actionSynopsis}
            modal={false}
            open={this.state.synopsis}
            onRequestClose={this.handleCloseSynopsis}>Synopsis Info</Dialog>
          <Dialog
            title={'Info: News Reel'}
            actions={actionHeadlines}
            modal={false}
            open={this.state.headlines}
            onRequestClose={this.handleCloseHeadlines}>headlines info</Dialog>
          <Dialog
            title={'Info: Archives'}
            actions={actionArchives}
            modal={false}
            open={this.state.archives}
            onRequestClose={this.handleCloseArchives}>archives info</Dialog>
          <Dialog
            title={'Info: Notes'}
            actions={actionNotes}
            modal={false}
            open={this.state.notes}
            onRequestClose={this.handleCloseNotes}>notes info</Dialog>
          <Dialog
            title={'Info: Routes'}
            actions={actionRoutes}
            modal={false}
            open={this.state.routes}
            onRequestClose={this.handleCloseRoutes}>routes info</Dialog>
          <Dialog
            title={'Info: Leaderboard'}
            actions={actionLeaderboard}
            modal={false}
            open={this.state.leaderboard}
            onRequestClose={this.handleCloseLeaderboard}>leadership info</Dialog>
            <Dialog
            title={'Info'}
            actions={actionGeneral}
            modal={false}
            open={this.state.general}
            onRequestClose={this.handleCloseGeneral}>general info</Dialog>
        </div>
        <Paper zDepth={1} >
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