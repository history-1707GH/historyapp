import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchSynopsis} from '../store'

class Synopsis extends Component {

  constructor(props){
    super()
}

  componentDidMount(){
   console.log(this.props)
    this.props.fetchSynopsis(this.props.place.pageid) 
  }

  render(){
    let content = ""
    if(this.props.synopsis.content) {
       content = this.props.synopsis.content
    };
    return(
      <div>
        {content}
        {/* <button onClick = {place => (this.unlock(place))}> unlock me </button> */}
        </div>
    )
  }
}


const mapState = state => {
  return {
    synopsis: state.synopsis,
    place: state.selectedPlace
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

