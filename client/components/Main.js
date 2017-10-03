import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import MapComponent from './MapComponent'
import NewsReel from './NewsReel'
import Synopsis from './Synopsis'
import Navbar from './Navbar'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import store, { fetchUser } from '../store'

class Main extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchData()
        this.props.fetchCurrentUser()
    }


    render() {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/home' component={Home}/>
                    <Route exact path='/map' component={MapComponent}/>  
                    <Route path='/headlines' component={NewsReel}/>
                    <Route path='/synopsis' component={Synopsis} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
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
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Main))
