import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSynopsis, fetchAllNext, gettingExperience } from '../store'
import NextExperience from './NextExperience'

class CheckIn extends Component {

    constructor(props) {
        super()
        this.state = {
            lock: true,
            hideNextPlaces: true,
            hideGame: true
        }
        this.getDistance = this.getDistance.bind(this)
        this.degTorad = this.degTorad.bind(this)
        this.isLock = this.isLock.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.isLock()
        const place = this.props.place        
        this.props.fetchAllNext(place.lat, place.lon)  //get list of nearby places in the event that the user checks in to this location, so you are ready to render next location
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentLocation !== this.props.currentLocation) this.isLock()      
      }

    handleClick(event){
        event.preventDefault()
        this.setState({hideNextPlaces: false, hideGame: false})
        const place = this.props.place
        const experience = {  
            lat: place.lat,
            lon: place.lon,
            wikiPageId: place.pageid,
            headlines: this.props.headlines
        }
        console.log('experience', experience)
        this.props.gettingExperience(experience)        
    }


    getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371 * 1000 // Radius of the earth in m
        const dLat = this.degTorad(lat2 - lat1)
        const dLon = this.degTorad(lon2 - lon1)
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.degTorad(lat1)) * Math.cos(this.degTorad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c // Distance in m
        return d
    }

    degTorad(deg) {
        return deg * (Math.PI / 180)
    }

    isLock() {
        const lat1 = this.props.place.lat
        const lon1 = this.props.place.lon
        const lat2 = this.props.currentLocation[0]
        const lon2 = this.props.currentLocation[1]
        const distance = this.getDistance(lat1, lon1, lat2, lon2)
        if (distance <= 50) this.setState({ lock: false })
        if (distance > 50) this.setState({ lock: true })
    }

    render() {

        return (
            <div>
                <button type="button" className="btn btn-success" disabled={this.state.lock} onClick = {this.handleClick}>Check In</button>
                <Link  to={'/next_experience'} hidden = {this.state.hideNextPlaces}>Onward!</Link>
                
                <Link to={'/game'} hidden = {this.state.hideGame}>Play a game!</Link>
            </div>
        )
    }
}


const mapState = state => {
    return {
        place: state.selectedPlace,
        currentLocation: state.currentLocation,
        synopsis: state.synopsis,
        headlines: state.headlines
    }
}

const mapDispatch = dispatch => {
    return {
        fetchAllNext: (lat, long) => {
            dispatch(fetchAllNext(lat, long))
        },
        gettingExperience: (experience) => {
            dispatch(gettingExperience(experience))
        }
    }
}

export default connect(mapState, mapDispatch)(CheckIn)