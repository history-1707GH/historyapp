import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {fetchSynopsis, fetchNearbyPlaces} from '../store'
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
    this.props.fetchSynopsis(this.props.place.pageid)
    this.isLock()
   
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.synopsis !== this.props.synopsis) {
        let content = nextProps.synopsis.content
        let index = 0
        let selector = ""
        if(content.includes('<span id="Menus">Menus</span>'))
            selector = '<span id="Menus">Menus</span>'
        else if(content.includes('<span id="Image_gallery">Image gallery</span>')) 
            selector = '<span id="Image_gallery">Image gallery</span>'
        else if(content.includes('<span id="See_also">See also</span>')) 
            selector = '<span id="See_also">See also</span>'
            else if (content.includes('<span id="References">References</span>'))
                selector = '<span id="References">References</span>'
                else if(content.includes('<span id="External_links">External links</span>'))
                    selector = '<span id="External_links">External links</span>'
                    
        
        index = content.indexOf(selector)
        const preparedText= content.slice(0, index);
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
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c // Distance in m
    return d
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

  handleClick(event){
    this.props.fetchNearbyPlaces(this.props.place)
  }

  render(){
    const html = {__html: this.state.synopsisText}
    
    return(
        <div>
      <div dangerouslySetInnerHTML = {html}/> 
        <br />
        <button type="button" className="btn btn-success" disabled = {this.state.lock}> Check in </button>
       
        </div>
    )
  }
}


const mapState = state => {
  return {
    synopsis: state.synopsis,
    place: state.selectedPlace,
    currentLocation: state.currentLocation
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