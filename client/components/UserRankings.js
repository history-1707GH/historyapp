import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRankings } from '../store/index';
import FlatButton from 'material-ui/FlatButton'
import Center from 'react-center'

class UserRankings extends Component {
  
  constructor(props){
    super(props)
  }

  componentDidMount(props){
    this.props.getRankings()
  }

  render(){
    return(
      <div>
        <h1>Top 10 Users</h1>
         {this.props.rankings.map(user => (
          <div key={user.id}>
            <p>
              {user.username} : {user.points}
            </p>
          </div>
          ))} 
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
    getRankings(){
      dispatch(fetchRankings())
    }
  }
}

export default connect(mapState, mapDispatch)(UserRankings)