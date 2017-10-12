import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { newUser, clearError } from '../store/index';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Center from 'react-center'
import Google from './Google'
import RaisedButton from 'material-ui/RaisedButton'
import { teal500, teal900, white, grey800 } from 'material-ui/styles/colors'


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
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(props) {
        this.props.userError.signupError = null
    }

    componentWillUnmount(props) {
        this.props.clearUserError()
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
        return (
            <div className="signup-page">
                <br />
                <br />
                <br />
                <Center>
                    <div>
                        <Google />
                    </div>
                </Center>
                <form onSubmit={this.handleSubmit}>
                    <Center>
                        <TextField
                            name='username'
                            floatingLabelText='Username'
                            type='input'
                            value={this.state.account.username}
                            onChange={this.handleChange}
                            required
                        />
                    </Center>
                    <Center>
                        <TextField
                            name='email'
                            floatingLabelText='Email'
                            type='email'
                            value={this.state.account.email}
                            onChange={this.handleChange}
                            errorText={(this.state.dirtyEmail && !(this.validateEmail(this.state.account.email))) ? 'Please enter an email of format: this@example.com' : null}
                        />
                    </Center>
                    <Center>
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
                    </Center>
                    <br />
                    <br />
                    <br />
                    <Center>
                        <div>
                            <RaisedButton type='submit' label="Create Account!"
                                backgroundColor={teal900} labelColor={white} disabled={((this.state.account.password.length < 6) || (this.state.account.password.length > 50) || (!this.validateEmail(this.state.account.email)))} />
                        </div>
                    </Center>
                    <Center>
                        <div>
                            {(this.props.userError.signupError) ? <p>{this.props.userError.signupError}</p> : null}
                        </div>
                    </Center>
                </form>
            </div>
        )
    }
}

const mapState = function (state) {
    return {
        userError: state.userError
    }
}

const mapDispatch = function (dispatch, ownProps) {
    return {
        createAccount(account, query) {
            dispatch(newUser(account, ownProps.history, query))
        },
        clearUserError: () => {
            dispatch(clearError())
        }
    }
}

export default connect(mapState, mapDispatch)(Signup)