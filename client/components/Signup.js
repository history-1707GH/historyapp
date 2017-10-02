import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { newUser } from '../store/index';

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            account: {
                username: '',
                email: '',
                password: ''
            },
            dirty: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const field = e.target.name;
        const content = e.target.value;
        const newInfo = Object.assign({}, this.state.account, { [field]: content })
        this.setState({ account: newInfo, dirty: field == 'password' ? true : false })

    }

    handleSubmit(e) {
        e.preventDefault();
        //submitting data to thunker
        this.props.createAccount(this.state.account)
        //clearing input fields
        e.target.username.value=''
        e.target.email.value=''
        e.target.password.value=''
        //clearing local state
        this.setState({
            account: {
                username: '',
                email: '',
                password: ''
            },
            dirty: false
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Username: </label>
                    <input
                        name='username'
                        type='text'
                        onChange={this.handleChange}
                        required
                    />
                    <label>Email: </label>
                    <input
                        name='email'
                        type='text'
                        onChange={this.handleChange}
                        required
                    />
                    <label>Password: </label>
                    <small>(Must be at least 8 characters long)</small>
                    <input
                        name='password'
                        type='text'
                        onChange={this.handleChange}
                        required
                    />
                    {this.state.dirty && (this.state.account.password.length < 8 || this.state.account.password.length > 50) ? (<p>Invalid password</p>) : null}
                    <button type='submit' disabled={(this.state.account.password.length < 8) || (this.state.account.password.length > 50)}>Create Account!</button>
                </form>
            </div>
        )
    }
}

const mapState = function (state) {
    return {

    }
}

const mapDispatch = function (dispatch, ownProps) {
    return {
        createAccount(account) {
            dispatch(newUser(account, ownProps.history))
        }
    }
}

export default connect(mapState, mapDispatch)(Signup)