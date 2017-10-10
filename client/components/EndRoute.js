import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';
import { deleteRouteId } from '../store'


class ProgressBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hidden: true
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        event.preventDefault()
        this.setState({ hidden: false })
        this.props.deleteRoute()
    }

    render() {
        return (
            <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
                <div hidden={!(this.state.hidden)}>
                    <RaisedButton
                        label='End Route'
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        primary={true}
                        onClick={this.handleClick}
                        style={{ marginRight: 12 }}
                    />
                </div>
                <Link to='/map' hidden={this.state.hidden}>
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
        deleteRoute: () => {
            dispatch(deleteRouteId())
        }
    }
}


export default connect(null, mapDispatch)(ProgressBar)