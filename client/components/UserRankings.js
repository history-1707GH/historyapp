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
          <Table>
            <TableHeader>
              <TableCell><b>Rank</b></TableCell>
              <TableCell><b>User</b></TableCell>
              <TableCell><b>Points</b></TableCell>
            </TableHeader>
            <TableBody>
            {this.props.rankings.map((user,index) => (
              <TableRow key={user.id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.points}</TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
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