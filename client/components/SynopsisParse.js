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
      synopsisText: ""
    }
    this.getDistance = this.getDistance.bind(this)
    this.degTorad = this.degTorad.bind(this)
    this.isLock = this.isLock.bind(this)
   
}

  componentDidMount(){
   
    
    this.props.fetchSynopsisParse(this.props.place.title)
    this.isLock() 
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.synopsis !== this.props.synopsis) {
    const preparedText= nextProps.synopsis && nextProps.synopsis.text['*'] //text.replacemyString.replace(/<(?:.|\n)*?>/gm, '');
    this.setState({synopsisText: preparedText})
   }
  }

  getDistance(lat1,lon1,lat2,lon2) {
    const R = 6371 * 1000 // Radius of the earth in m
    const dLat = this.degTorad(lat2-lat1)  
    const dLon = this.degTorad(lon2-lon1) 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.degTorad(lat1)) * Math.cos(this.degTorad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in m
    return d;
  }
  
  degTorad(deg) {
    return deg * (Math.PI/180)
  }

  isLock(){
    const lat1 = this.props.place.lat
    const lon1 = this.props.place.lon
    const lat2 = this.props.currentLocation[0]
    const lon2 = this.props.currentLocation[1]
    const distance = this.getDistance(lat1, lon1, lat2, lon2)
    if(distance < 50) this.setState({lock: false})
  }

  render(){
    let content = ""
    if(this.props.synopsisContent.content) {
       content = this.props.synopsisContent.content
    }
    
    return(
      <div>
        
        {content}
        <br />
        <button type="button" className="btn btn-success" disabled = {this.state.lock}> Check In </button>

        </div>
    )
  }
}


const mapState = state => {
  return {
    synopsis: state.synopsisParse.parse,
    
    place: state.selectedPlace,
    currentLocation: state.currentLocation
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

