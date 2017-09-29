import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchSynopsis} from '../store'
import NextExperience from './NextExperience'

class Synopsis extends Component {

  componentDidMount(){
    this.props.fetchSynopsis(6549088) 
  }

  render(){
    let content = ""
    if(this.props.synopsis.content) {
       content = this.props.synopsis.content
    };
    return(
      <div>
        {content}
        <NextExperience/>
      </div>
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
    fetchSynopsis: pageId => {
      dispatch(fetchSynopsis(pageId))
    }
  }
}


export default connect(mapState, mapDispatch)(Synopsis)

