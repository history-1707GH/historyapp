import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';
import { deleteRouteId, deleteCurrentRoute } from '../store'


class ProgressBar extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        event.preventDefault()
        this.props.deleteRouteId()
        this.props.deleteCurrentRoute()
    }

    render() {
        return (
            <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }} onClick = {this.handleClick}>
                <Link to='/map' >
                    <RaisedButton
                        label={'START A NEW JOURNEY'}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        primary={true}
                        style={{ marginRight: 12 }}
                    />
                </Link>
            </div>
        )
    }
}


const mapDispatch = dispatch => {
    return {
        deleteRouteId: () => {
            dispatch(deleteRouteId())
        },
        deleteCurrentRoute: () => {
            dispatch(deleteCurrentRoute())
        }
    }
}


export default connect(null, mapDispatch)(ProgressBar)