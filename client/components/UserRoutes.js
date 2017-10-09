import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllRoutes } from '../store'

class UserRoutes extends Component {

    componentDidMount() {
        if(this.props.userId) this.props.fetchAllRoutes(this.props.userId)
    }

    render() {
        return (
            <ul>
                {this.props.userRoutes && this.props.userRoutes.map(route => {
                    return (
                        <li>
                            Started at: {route.createdAt}
                            {route.experiences.map(experience => {
                                return (
                                    <li>
                                        <span> Title:{experience.synopsis.title} </span>
                                        <span> Arrived At: {experience.route_experience.createdAt} </span>
                                    </li>
                                )
                            })}
                        </li>
                    )
                })}
            </ul>
        )
    }
}


const mapState = state => {
    return {
        userId: state.user.id,
        userRoutes: state.userRoutes
    }
}



const mapDispatch = dispatch => {
    return {
        fetchAllRoutes: userId => {
            dispatch(fetchAllRoutes(userId))
        }
    }
}

export default connect(mapState, mapDispatch)(UserRoutes)