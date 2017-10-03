import React, { Component }from 'react'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import {teal900} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton'


class Navbar extends Component{
    constructor(props){
        super(props)
    }

    render(props){
        let buttonText, buttonRoute
        const styles = {
            title: {
            cursor: 'pointer',
            }
        }
        this.props.currentUser.id ? (buttonText="Logout", buttonRoute="/logout") : (buttonText="Login", buttonRoute="/login")

        return(
            <div>
                <AppBar
                title={<span style={styles.title}>meander</span>}
                iconElementLeft={<IconButton></IconButton>}
                iconElementRight={<Link to={buttonRoute}><FlatButton label={buttonText} /> </Link>}
                style={{backgroundColor:teal900}}
                />
            </div>
        )
    }
}

const mapState = state => {
    return {
        currentUser: state.user
    }
}

export default connect(mapState)(Navbar)
