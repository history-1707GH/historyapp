import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchRankings } from '../store/index'
import FlatButton from 'material-ui/FlatButton'
import Center from 'react-center'
import Table, { TableBody, TableHeaderColumn, TableHeader, TableRow, TableRowColumn } from 'material-ui/Table'
import {  teal500, white, teal900 } from 'material-ui/styles/colors'

class UserRankings extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(props) {
    this.props.getRankings()
  }

  render() {
    let leaders = this.props.rankings
    while (leaders.length < 10) {
      leaders = [...leaders, {username:'--', points:'--'}]
    }
    return (
      <div className="leaderboard">
        <Center>
          <h2 className="title">LEADERBOARD</h2>
        </Center>
        <Center>
          <div className="leader-table">
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} > 
              <TableRow>
                <TableHeaderColumn style={{width: '25%', textAlign: 'center', color:teal900, height:'35px'}}><b>Rank</b></TableHeaderColumn>
                <TableHeaderColumn style={{width: '45%', textAlign: 'justify', color:teal900, height:'35px'}}><b>User</b></TableHeaderColumn>
                <TableHeaderColumn style={{width: '30%', textAlign: 'center', color:teal900, height:'35px'}}><b>Points</b></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {leaders.map((user, index) => (
                <TableRow key={user.id}>
                  <TableRowColumn style={{width: '25%', textAlign: 'center', color:teal900, height:'25px'}}>{index + 1}</TableRowColumn>
                  <TableRowColumn style={{width: '45%', textAlign: 'justify', height:'25px'}}>{user.username}</TableRowColumn>
                  <TableRowColumn style={{width: '30%', textAlign: 'center', height:'25px'}}>{user.points}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </Center>
        <br/>
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