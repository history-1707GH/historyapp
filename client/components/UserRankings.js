import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRankings } from '../store/index';
import FlatButton from 'material-ui/FlatButton'
import Center from 'react-center'
import Table, { TableBody, TableHeaderColumn, TableHeader, TableRow, TableRowColumn } from 'material-ui/Table';

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
            <TableHeader displaySelectAll={false}> 
              <TableRow>
                <TableHeaderColumn><b>Rank</b></TableHeaderColumn>
                <TableHeaderColumn><b>User</b></TableHeaderColumn>
                <TableHeaderColumn><b>Points</b></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.rankings.map((user, index) => (
                <TableRow key={user.id}>
                  <TableRowColumn>{index + 1}</TableRowColumn>
                  <TableRowColumn>{user.username}</TableRowColumn>
                  <TableRowColumn>{user.points}</TableRowColumn>
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