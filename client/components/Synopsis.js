import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchSynopsis} from '../store'
import NextExperience from './NextExperience'

class Synopsis extends Component {

  componentDidMount(){
    this.props.fetchSynopsis("Hanover Square (IRT Third Avenue Line)") 
  }

  render(){
    let content = ""
    if(this.props.text) {
       content = this.props.text
    };
    console.log('content', content)
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
    title: state.synopsis.parse.displaytitle,
    text: state.synopsis.parse.text.replace(/<(?:.|\n)*?>/gm, '')
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSynopsis: pageTitle => {
      dispatch(fetchSynopsis(pageTitle))
    }
  }
}


export default connect(mapState, mapDispatch)(Synopsis)

