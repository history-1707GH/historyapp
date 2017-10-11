import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllRoutes } from '../store'
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import Center from 'react-center'
import {  teal500, teal900, white, grey800 } from 'material-ui/styles/colors'


class UserRoutes extends Component {

    componentDidMount() {
        if(this.props.userId) this.props.fetchAllRoutes(this.props.userId)
    }

    render() {
        const routes = this.props.userRoutes
        return (
            <div className="routes-page">
                <Center>
                    <h3 className="title">Your Routes</h3>
                </Center>
                <br/>
                {
                    routes.length > 0 ? routes.map(route => {
                        let rDate = new Date(route.createdAt).toDateString()
                        return <div>
                            <Card className="route-card">
                                <CardTitle title={rDate}/>
                                {
                                route.experiences.length > 0 && route.experiences.map( (experience, idx) => {
                                    let xTime = new Date(experience.route_experience.createdAt).toLocaleTimeString()
                                    return <CardHeader title={experience.synopsis.title}
                                    subtitle={`Location ${idx+1} arrived at: ${xTime}`}/>
                                    })
                                }
                            </Card>
                            <br />
                        </div> 
                    }) : (
                        <Card key={0} className="">
                        <Center>
                          <CardText color={ grey800 }>
                            <Center>
                            {
                                this.props.userId ? 'No previous routes taken. Start a new adventure today!' : 'Please login to view your routes or start a new adventure!' 
                            }
                            </Center>
                          </CardText>
                        </Center>
                      </Card>
                      )
                }
            </div>
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