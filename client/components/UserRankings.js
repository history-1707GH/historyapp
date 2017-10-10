import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRankings } from '../store/index';
import FlatButton from 'material-ui/FlatButton'
import Center from 'react-center'

class UserRankings extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(props) {
    this.props.getRankings()
  }

  render() {
    return (
      <div>
        <Center>
          <h1>Rankings</h1>
        </Center>
        <br />
        <Center>
          <table style={{width: '300px', backgroundColor: '#136845'}}>
            <tr>
              <th><b>User</b></th>
              <th><b>Points</b></th>
            </tr>
            {this.props.rankings.map(user => (
              <tr key={user.id}>
                <th>
                  {user.username}
                </th>
                <th>
                  {user.points}
                </th>
              </tr>
            ))}
          </table>
        </Center>
      </div>
    )
  }

}

const mapState = (state) => {
  return {
    rankings: state.userRankings
  }
}

const mapDispatch = (dispatch) => {
  return {
    getRankings() {
      dispatch(fetchRankings())
    }
  }
}

export default connect(mapState, mapDispatch)(UserRankings)