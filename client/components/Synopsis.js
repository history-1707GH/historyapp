import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import {fetchSynopsis} from '../store'

class Synopsis extends Component {

  componentDidMount(){
    this.props.fetchSynopsis()
  }

  render(){
    return(
      <div>xx</div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSynopsis: function(location) {
      dispatch(fetchSynopsis(location))
    }
  }
}

export default connect(null, mapDispatch)(Synopsis)

