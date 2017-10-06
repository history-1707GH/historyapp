import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import MapComponent from './MapComponent'
import NewsReel from './NewsReel'
import Synopsis from './Synopsis'
import Navbar from './Navbar'
import Notes from './Notes'
import ProgressBar from './ProgressBar'
import Login from './Login'
import Signup from './Signup'
import Archives from './Archives'
import Home from './Home'

import NextExperience from './NextExperience'
import store, { fetchUser, fetchCurrentLocation, watchId } from '../store'


class Main extends Component {


    componentDidMount(){
        this.props.fetchData()
        this.props.fetchCurrentUser()
        this.props.fetchCurrentLocation()
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(watchId);
      }

    render() {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/map' component={MapComponent}/> 
                    <Route exact path='/notes' component={Notes}/> 
                    <Route path='/headlines' component={NewsReel}/>
                    <Route path='/synopsis' component={Synopsis} />
                    <Route exact path='/progress' component={ProgressBar} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/next_experience' component={NextExperience} />  
                    <Route exact path='/archives' component={Archives}     />          
                </Switch>
            </div>
        )
    }
}


const mapState = null

const mapDispatch = function(dispatch){
    return {
        fetchData(){
            // dispatch(fetchItems())
        },
        fetchCurrentUser(){
            dispatch(fetchUser())
        },
        fetchCurrentLocation(){
            dispatch(fetchCurrentLocation())
        },
    }
}

export default withRouter(connect(mapState, mapDispatch)(Main))
