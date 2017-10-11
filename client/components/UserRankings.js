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
      leaders = [...leaders, {username:null, points:0}]
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
              <TableRow style={{color:teal900}}>
                <TableHeaderColumn style={{width: '25%', textAlign: 'center'}}><b>Rank</b></TableHeaderColumn>
                <TableHeaderColumn style={{width: '50%', textAlign: 'justify'}}><b>User</b></TableHeaderColumn>
                <TableHeaderColumn style={{width: '25%', textAlign: 'center'}}><b>Points</b></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.rankings.map((user, index) => (
                <TableRow key={user.id}>
                  <TableRowColumn style={{width: '25%', textAlign: 'center', color:teal900}}>{index + 1}</TableRowColumn>
                  <TableRowColumn style={{width: '50%', textAlign: 'justify'}}>{user.username}</TableRowColumn>
                  <TableRowColumn style={{width: '25%', textAlign: 'center'}}>{user.points}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
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