import React, { Component } from 'react'
import store from '../store'
import Center from 'react-center'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logIn } from '../store/index'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Google from './Google'

class Login extends Component {
  constructor(props) {
    super(props)
    this.checkRedirect = this.checkRedirect.bind(this)
  }

  componentDidMount() {
    document.body.className = "home";
    this.props.user.loginError = null
  }

  componentWillUnmount(props) {
    document.body.className = null;
  }

  checkRedirect(e) {
    e.preventDefault();
    let query = this.props.location.search
    this.props.logInUser({ email: e.target.email.value, password: e.target.password.value }, query)
  }

  render(props) {
    return (
      <div>
        <Center>
          <div>
            <img src="/meander-logo-white.png" className="meander-logo" />
          </div>
        </Center>
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
              <TextField
                name='email'
                floatingLabelText='Email'
                type='text'
                required
              />
              <br />
              <br />
              <TextField
                name='password'
                floatingLabelText='Password'
                type='password'
                required
              />
              <br />
              <Center>
                <div>
                  <FlatButton type='submit'>SIGN IN</FlatButton>
                </div>
              </Center>
              <Center>
                <div>
                  {this.props.user.loginError ? <p>{this.props.user.loginError}</p> : null}
                </div>
              </Center>
            </form>
          </Center>
          <br />
          <br />
        </div>
        <Center>
          <div>
            <Link to={this.props.location.search.length ? '/signup?=redirect=map' : '/signup'}>
              <FlatButton label="Create a new account" />
            </Link>
          </div>
        </Center>
      </div>
    )
  }
}

const mapState = function (state) {
  return {
    user: state.user
  }
}

const mapDispatch = function (dispatch, ownProps) {
  return {
    logInUser: (logInInfo, query) => {
      dispatch(logIn(logInInfo, ownProps.history, query))
    }
  }
}
export default connect(mapState, mapDispatch)(Login)
