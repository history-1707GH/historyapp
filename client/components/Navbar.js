import React, { Component }from 'react'
import { NavLink, Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import { teal500, teal900, white } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import { logOut } from '../store'
import MapIcon from 'material-ui/svg-icons/maps/map'


export const Navbar = (props) => {
    let iconRight
    const styles = {
        title: {
        cursor: 'pointer',
        }
    }
    props.currentUser.id ? 
        iconRight=(<Link to='/'><FlatButton type="button" label='Logout' onClick={props.handleLogout} style={{backgroundColor:teal500, color:white}}/></Link>) 
        : 
        iconRight=(<Link to={(props.currentURL==='/') ? '/login?redirect=map' : '/login'}><FlatButton label='Login' style={{backgroundColor:teal500, color:white}} /> </Link>)
    return (
        <div >
            <AppBar
                title={<span style={styles.title}>meander</span>}
                iconElementLeft={<NavLink to="/map"><IconButton touch={true} className="map-icon"> <MapIcon color={white} /></IconButton></NavLink>}
                iconElementRight={iconRight}
                style={{backgroundColor:teal900, position:"fixed", top:0}}
            />
        </div>
    )
}

const mapState = (state) => {
    let currentURL
    if (typeof window !== 'undefined') {
           currentURL = window.location.pathname
    }
    return {
        currentUser: state.user,
        currentURL: currentURL
    }
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        handleLogout: () => {
            dispatch(logOut(ownProps.history))
        }
    }
}

export default connect(mapState, mapDispatch)(Navbar)
