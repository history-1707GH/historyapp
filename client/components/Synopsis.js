import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import {fetchSynopsis} from '../store'

class Synopsis extends Component {

  componentDidMount(){
    this.props.fetchSynopsis(6549088) 
  }

  render(){
    let content = ""
    console.log(this.props.synopsis)
    if(this.props.synopsis.content) {
       content = this.props.synopsis.content
    };
    return(
      <div>{content}</div>
    )
  }
}


const mapState = state => {
  return {
    synopsis: state.synopsis
  }
}
const mapDispatch = dispatch => {
  return {
    fetchSynopsis: function(pageId) {
      dispatch(fetchSynopsis(pageId))
    }
  }
}


export default connect(mapState, mapDispatch)(Synopsis)

