import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Center from 'react-center'
import { teal500, teal900, white, grey800 } from 'material-ui/styles/colors'
import { GridList, GridTile } from 'material-ui/GridList'
import { fetchAllRoutes, updateUser, clearError } from '../store'

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: props.user.username
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(props) {
    this.props.userError.updateError = null
    const { user, fetchAllRoutes } = this.props
    if (user.id) return fetchAllRoutes(user.id);
    this.setState({username: this.props.user.username})
  }

  componentWillUnmount(props) {
    this.props.clearUserError()
  }

  handleChange(e) {
    const field = e.target.name;
    const content = e.target.value;
    this.setState({ [field]: content })
  }

  handleSubmit(e) {
    e.preventDefault();
    let query = this.props.location.search
    this.props.updateAccount({ username: this.state.username, userId: this.props.user.id })
  }

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
                <form onSubmit={this.handleSubmit}>
                  <Center>
                    <TextField
                      type="input"
                      name="username"
                      defaultValue={this.state.username ? this.state.username : null}
                      floatingLabelText="Username"
                      hintText='(Please enter a username)'
                      hintStyle={{ fontSize: '10px' }}
                      onChange={this.handleChange}
                      required
                      errorText={(!this.state.username || this.state.username==='') ? 'Username required' : null}
                    />
                  </Center>
                  <br />
                  <br />
                  <Center>
                    <div>
                      <RaisedButton
                        type='submit'
                        label="SAVE"
                        disabled={!this.state.username || this.state.username===''}
                        backgroundColor={teal900}
                        labelColor={white}
                        style={{margin:"12px"}}
                      />
                      {
                        user.username ? 
                          <Link to="/map">
                          <RaisedButton
                            label="MAP"
                            backgroundColor={teal900}
                            labelColor={white}
                            style={{margin:"12px"}}
                          /> </Link>: null
                      }
                    </div>
                  </Center>
                  <Center>
                    <div>
                      {(this.props.userError.updateError) ? <p>{this.props.userError.updateError}</p> : null}
                    </div>
                  </Center>
                  <br />
                  <br />
                </form>
              </Center>
              <br />
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
            : null
        }
      </div>
    )
  }
}
export const mapState = state => {
  return {
    user: state.user,
    routes: state.userRoutes,
    userError: state.userError
  }
}

export const mapDispatch = dispatch => {
  return {
    fetchAllRoutes: userId => {
      dispatch(fetchAllRoutes(userId))
    },
    updateAccount: accInfo => {
      dispatch(updateUser(accInfo))
    },
    clearUserError: () => {
      dispatch(clearError())
    }
  }
}

export default connect(mapState, mapDispatch)(Account)
