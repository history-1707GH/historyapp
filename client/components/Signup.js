import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { newUser, checkUsername } from '../store/index';
import Google from './Google'

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            account: {
                username: '',
                email: '',
                password: ''
            },
            dirtyPassword: false,
            dirtyEmail: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.usernameCheck = this.usernameCheck.bind(this)
    }

    usernameCheck(){
        this.props.usernameAvail({username: this.state.account.username})
    }

    validateEmail(email){
        return /\S+@\S+\.\S+/.test(email)
    }

    handleChange(e) {
        const field = e.target.name;
        const content = e.target.value;
        const newInfo = Object.assign({}, this.state.account, { [field]: content })
        this.setState({ account: newInfo})
        if (field==='password'){
            this.setState({dirtyPassword: true})
        }
        if (field==='email'){
            this.setState({dirtyEmail: true})
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        //submitting data to thunker
        let query = this.props.location.search
        this.props.createAccount(this.state.account, query)
        //clearing local state
        this.setState({
            account: {
                username: '',
                email: '',
                password: ''
            },
            dirtyPassword: false,
            dirtyEmail: false
        })

    }

    render() {
        console.log(this.validateEmail(this.state.account.email))
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Username: </label>
                    <input
                        name='username'
                        type='text'
                        value={this.state.account.username}
                        onChange={this.handleChange}
                        
                    />
                    <button type='button' onClick={this.usernameCheck}>Check Availability</button>
                     {(typeof this.props.message==='string') ? (<p>{this.props.message}</p>) : null} 
                    <label>Email: </label>
                    <input
                        name='email'
                        type='text'
                        value={this.state.account.email}
                        onChange={this.handleChange}
                        
                    />
                    {(this.state.dirtyEmail && !(this.validateEmail(this.state.account.email))) ? (<p>Please enter a valid email</p>) : null}
                    <label>Password: </label>
                    <small>(Must be at least 6 characters long)</small>
                    <input
                        name='password'
                        type='password'
                        value={this.state.account.password}
                        onChange={this.handleChange}
                        
                    />
                    {this.state.dirtyPassword && (this.state.account.password.length < 6 || this.state.account.password.length > 50) ? (<p>Invalid password</p>) : null}
                    <button type='submit' disabled={(this.state.account.password.length < 6) || (this.state.account.password.length > 50) || (this.state.account.email.length===0)}>Create Account!</button>
                </form>
                <Google />
            </div>
        )
    }
}

const mapState = function (state) {
    return {
        message: state.authValidation
    }
}

const mapDispatch = function (dispatch, ownProps) {
    return {
        createAccount(account, query) {
            dispatch(newUser(account, ownProps.history, query))
        },
        usernameAvail(name){
            dispatch(checkUsername(name))
        }
    }
}

export default connect(mapState, mapDispatch)(Signup)