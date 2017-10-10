import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRankings } from '../store/index';
import FlatButton from 'material-ui/FlatButton'
import Center from 'react-center'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

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
            <TableHead>
              <TableCell>User</TableCell>
              <TableCell numeric>Points</TableCell>
            </TableHead>
            <TableBody>
              {this.props.rankings.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    {user.username}
                  </TableCell>
                  <TableCell numeric>
                    {user.points}
                  </TableCell>
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