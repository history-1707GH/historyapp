import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Center from 'react-center'
import { teal500, teal900, white, grey800 } from 'material-ui/styles/colors'
import { GridList, GridTile } from 'material-ui/GridList'
import { fetchAllRoutes } from '../store'

class Account extends Component {
  constructor(props) {
    super(props)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  componentDidMount(){
    const { user, fetchAllRoutes } = this.props
    if (user.id) return fetchAllRoutes(user.id);
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
    const { user, routes } = this.props
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        overflowY: 'auto',
        margin: 20
      },
    }

    return (
      <div className="account-page">
        {
          user.id ? 
            <div>
             <Center> <h3 className="account-title">Account Info</h3> </Center>
              <Center>
              <form onSubmit = {this.handleSubmit}>
                <Center>
                <TextField 
                  type = "input" 
                  name= "username" 
                  defaultValue = {user.username ? user.username : null}
                  floatingLabelText="Username"
                />
                </Center>
                <Center>
                <TextField 
                  type = "email" 
                  name= "email" 
                  defaultValue = {user.email ? user.email : null}
                  floatingLabelText="Email"
                />
                </Center>
                <Center>
                <TextField 
                  type = "password" 
                  name= "password" 
                  floatingLabelText="Password"
                />
                </Center>
                </form>
              </Center>
              <br/>
              <GridList style={styles.gridList}>
                <GridTile
                  title={user.points}
                  subtitle={`Points`}
                >
                  <img className="next-icon" src="/images/star.png" />
                </GridTile>
                <GridTile
                  title={`${routes.length}`}
                  subtitle={'Routes'}
                >
                  <img className="next-icon" src="/images/route.png" />
                </GridTile>
              </GridList>
            </div>
            : <div>Please Login</div>
        }
        </div>
    )
  }
}
export const mapState = state => {
  return {
    user: state.user,
    routes: state.userRoutes
  }
}

export const mapDispatch = dispatch => {
  return {
    fetchAllRoutes: userId => {
      dispatch(fetchAllRoutes(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Account)
