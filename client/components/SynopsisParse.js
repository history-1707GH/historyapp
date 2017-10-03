import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSynopsisParse} from '../store'
import NextExperience from './NextExperience'

class Synopsis extends Component {

  constructor(props){
    super()
    this.state = {
      lock: true,
    } 
}

  componentDidMount(){    
    this.props.fetchSynopsisParse(this.props.place.title)
  }


  render(){
    return(
      <div>
      </div>
    )
  }
}


const mapState = state => {
  return {
    synopsis: state.synopsisParse.parse,  
    place: state.selectedPlace,
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSynopsis: pageTitle => {
      dispatch(fetchSynopsisParse(pageTitle))
    }
  }
}


export default connect(mapState, mapDispatch)(Synopsis)

