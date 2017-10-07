import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {  teal900, teal500, white } from 'material-ui/styles/colors'
import { fetchSynopsis, fetchAllNext,getExperience, checkinPlace} from '../store'
import NextExperience from './NextExperience'
import RaisedButton from 'material-ui/RaisedButton'
import { gettingExperience } from '../store'


class CheckIn extends Component {

    constructor(props) {
        super()
        this.state = {
            lock: false,
            checkin: false
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

    handleClick(event) {
        event.preventDefault()
        this.setState({ hideNextPlaces: false, hideGame: false })
        const place = this.props.place
        const experience = {
            lat: place.lat,
            lon: place.lon,
            wikiPageId: place.pageid,
            headlines: this.props.headlines
        }
        this.props.gettingExperience(experience)
        this.setState({ checkin: true })
        this.props.fetchCheckinPlace(this.props.place)
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
        // if (distance <= 50) this.setState({ lock: false })
        // if (distance > 50) this.setState({ lock: true })
    }

    render() {

        if (this.state.lock) {
            return (
                <RaisedButton type="button" disabled={true} fullWidth={true}> You are too far to check in!</RaisedButton>
            )
        }
        else if (this.state.checkin) {
            return (
                <Link to={'/next_experience'} >
                    <RaisedButton type="button" label="Onward!" fullWidth={true} style={{labelColor:teal500, color:teal900}}/>
                </Link>
            )
        }
        else return (
            <RaisedButton type="button" onClick={this.handleClick} fullWidth={true} label="Check In" labelColor={white} backgroundColor={teal900}/>
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
        },
        fetchCheckinPlace: (place) => {
            dispatch(checkinPlace(place))
        },

    }
}

export default connect(mapState, mapDispatch)(CheckIn)