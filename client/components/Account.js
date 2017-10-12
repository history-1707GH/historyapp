import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Center from 'react-center'
import { teal500, teal900, white, grey800 } from 'material-ui/styles/colors'

class Account extends Component {
  constructor(props) {
    super(props)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  // handleSubmit(event) {
  //   event.preventDefault()
  //   const user = {
  //     firstName: event.target.firstName.value,
  //     lastName: event.target.lastName.value,
  //     email: event.target.email.value,
  //     address: event.target.address.value
  //   }
  // }

  render() {
    const { user } = this.props
    return (
      user ? (
        <div className="account-page">
          <Center>
          <form onSubmit = {this.handleSubmit}>
            <TextField 
              type = "input" 
              name= "username" 
              defaultValue = {user.username ? user.username : null}
              floatingLabelText="Username"
            />
            <TextField 
              type = "email" 
              name= "email" 
              defaultValue = {user.email ? user.email : null}
              floatingLabelText="Email"
            />
            <TextField 
              type = "password" 
              name= "password" 
              floatingLabelText="Password"
            />
            </form>
          </Center>
        </div>
      ) : (
        <div>Please Login</div>
      )
    )
  }

}

export const mapState = state => {
  return {
    user: state.user
  }
}

export const mapDispatch = null

export default connect(mapState, mapDispatch)(Account)
