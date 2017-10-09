import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { newUser, checkUsername, clearMessage } from '../store/index';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Center from 'react-center'
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
            dirtyEmail: false,
            dirtyUsername: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.usernameCheck = this.usernameCheck.bind(this)
    }

    componentDidMount() {
        this.props.user.signupError = null
    }

    usernameCheck() {
        this.props.usernameAvail({ username: this.state.account.username })
    }

    validateEmail(email) {
        return /\S+@\S+\.\S+/.test(email)
    }

    handleChange(e) {
        const field = e.target.name;
        const content = e.target.value;
        const newInfo = Object.assign({}, this.state.account, { [field]: content })
        this.setState({ account: newInfo })
        if (field === 'password') {
            this.setState({ dirtyPassword: true })
        }
        if (field === 'email') {
            this.setState({ dirtyEmail: true })
        }
        if (field === 'username') {
            this.setState({ dirtyUsername: true })
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
        this.props.clearCheckAvail()
    }

    render() {
        return (
            <div>
                <Center>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            name='username'
                            floatingLabelText='Username'
                            type='input'
                            value={this.state.account.username}
                            onChange={this.handleChange}
                            errorStyle={(this.props.message && this.props.message==='Username available') ? {color: 'green'} : {color: 'red'}}
                            errorText={(typeof this.props.message === 'string') ? this.props.message : null}
                        />
                        <br />
                        <FlatButton type='button' onClick={this.usernameCheck}>Check Availability</FlatButton>
                        <br />
                        <br />
                        <TextField
                            name='email'
                            floatingLabelText='Email'
                            type='email'
                            value={this.state.account.email}
                            onChange={this.handleChange}
                            errorText={(this.state.dirtyEmail && !(this.validateEmail(this.state.account.email))) ? 'Please enter an email of format: this@example.com' : null}
                        />
                        <br />
                        <br />
                        <TextField
                            name='password'
                            type='password'
                            floatingLabelText='Password'
                            hintText='(Must be at least 6 characters long)'
                            hintStyle={{ fontSize: '10px' }}
                            value={this.state.account.password}
                            onChange={this.handleChange}
                            errorText={this.state.dirtyPassword && (this.state.account.password.length < 6 || this.state.account.password.length > 50) ? 'Invalid password' : null}
                        />
                        <br />
                        <Center>
                            <div>
                                <FlatButton type='submit' disabled={(this.state.account.password.length < 6) || (this.state.account.password.length > 50) || (this.state.account.email.length === 0)}>Create Account!</FlatButton>
                            </div>
                        </Center>
                        <Center>
                            <div style='color: red'>
                                {(this.props.user.signupError) ? <p>{this.props.user.signupError}</p> : null}
                            </div>
                        </Center>
                    </form>
                </Center>
                <Center>
                    <div>
                        <Google />
                    </div>
                </Center>
            </div>
        )
    }
}

const mapState = function (state) {
    return {
        message: state.checkUsername,
        user: state.user
    }
}

const mapDispatch = function (dispatch, ownProps) {
    return {
        createAccount(account, query) {
            dispatch(newUser(account, ownProps.history, query))
        },
        usernameAvail(name) {
            dispatch(checkUsername(name))
        },
        clearCheckAvail() {
            dispatch(clearMessage())
        }
    }
}

export default connect(mapState, mapDispatch)(Signup)