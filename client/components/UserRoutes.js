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
                    // const dateTimeArr = route.route_experience.createdAt.split('T')
                    // const dateArr = dateTimeArr[0].split("-")
                    // const date = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
                    // const timeArr = dateTimeArr[1].split(':')
                    // const hours = timeArr[0]<=12 ? timeArr[0] : timeArr[0]-12
                    // const minutes = timeArr[1]
                    // const time = `${hours}:${minutes}`
                    
                    return (
                        <li>
                            Started at: {route.createdAt}
                            {route.experiences.map(experience => {
                                return (
                                    <li>
                                        <span> Title:{experience.synopsis.title} </span>
                                        <span> Arrived At: {/*`${date}, ${time}`*/} </span>
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