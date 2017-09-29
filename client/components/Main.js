import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import MapComponent from './MapComponent'
import NewsReel from './NewsReel'
import Synopsis from './Synopsis'
import Auth from './Auth'

//import other components here

import store, { fetchUser } from '../store';

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
                <Switch>
                    <Route exact path='/map' component={MapComponent}/>                    
                    <Route path='/headlines' component={NewsReel}/>
                    <Route path='/synopsis' component={Synopsis} />
                    <Route path='/auth' component={Auth} />
                    {/* <Route exact path='/' component={Home}/>  */}
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
