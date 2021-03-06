import React, { Component } from 'react'
import store from '../store'
import Center from 'react-center'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logIn, clearError } from '../store/index'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Google from './Google'
import {  teal500, teal900, white, grey800 } from 'material-ui/styles/colors'



class Login extends Component {
  constructor(props) {
    super(props)
    this.checkRedirect = this.checkRedirect.bind(this)
  }

  componentDidMount(props) {
    this.props.userError.loginError = null
  }

  componentWillUnmount(props) {
    this.props.clearUserError()
  }

  checkRedirect(e) {
    e.preventDefault();
    let query = this.props.location.search
    this.props.logInUser({ email: e.target.email.value, password: e.target.password.value }, query)
  }

  render(props) {
    return (
      <div className="login-page">
        <br />
        <br />
        <Center>
          <Google />
        </Center>
        <br />
        <br />
        <div>
          <Center>
            <form onSubmit={this.checkRedirect}>
              <Center>
              <TextField
                name='email'
                floatingLabelText='Email'
                type='text'
                required
              />
              </Center>
              <Center>
              <TextField
                name='password'
                floatingLabelText='Password'
                type='password'
                required
              />
              </Center>
              <br />
              <Center>
                <div>
                  <RaisedButton 
                  type='submit'
                  label="SIGN IN" 
                  backgroundColor={teal900}
                  labelColor={white}
                />
                </div>
              </Center>
              <Center>
                <div>
                  {this.props.userError.loginError ? <p>{this.props.userError.loginError}</p> : null}
                </div>
              </Center>
            </form>
          </Center>
          <br />
          <br />
          <br />
        </div>
        <Center>
          <div>
            <Link to={this.props.location.search.length ? '/signup?=redirect=map' : '/signup'}>
              <FlatButton label="Create a new account" labelColor={teal900} color={teal900}/>
            </Link>
          </div>
        </Center>
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
    logInUser: (logInInfo, query) => {
      dispatch(logIn(logInInfo, ownProps.history, query))
    },
    clearUserError: () => {
      dispatch(clearError())
    }
  }
}
export default connect(mapState, mapDispatch)(Login)
