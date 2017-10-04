import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSynopsis, fetchAllNext } from '../store'
import NextExperience from './NextExperience'

class CheckIn extends Component {

    constructor(props) {
        super()
        this.state = {
            lock: true,
            hideNextPlaces: true
        }
        this.getDistance = this.getDistance.bind(this)
        this.degTorad = this.degTorad.bind(this)
        this.isLock = this.isLock.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.isLock()
        this.props.fetchAllNext(this.props.place.lat, this.props.place.lon)  //get list of nearby places in the event that the user checks in to this location, so you are ready to render next location
    }

    handleClick(event){
        event.preventDefault()
        this.setState({hideNextPlaces: false})
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
        if (distance < 50) this.setState({ lock: false })
    }

    render() {

        return (
            <div>
                <button type="button" className="btn btn-success" disabled={this.state.lock} onClick = {this.handleClick}>Check In</button>
                <Link to={'/next_experience'} hidden = {this.state.hideNextPlaces}>Onward!</Link>
            </div>
        )
    }
}


const mapState = state => {
    return {
        place: state.selectedPlace,
        currentLocation: state.currentLocation
    }
}

const mapDispatch = dispatch => {
    return {
        fetchAllNext: (lat, long) => {
            dispatch(fetchAllNext(lat, long))
        }
    }
}

export default connect(mapState, mapDispatch)(CheckIn)