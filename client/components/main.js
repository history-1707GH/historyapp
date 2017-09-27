import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

//import other components here

import store, {  } from '../store';

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
                <h1>Testing</h1>
                <main>
                    <Switch>
                        {/* <Route exact path='/signup' component={Signup}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/' component={Home}/> */}
                    </Switch>
                </main>
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
            // dispatch(fetchUser())
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Main))