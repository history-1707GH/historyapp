import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSynopsis, fetchAllNext, gettingExperience, deleteCurrentRoute } from '../store'
import NextExperience from './NextExperience'
import RaisedButton from 'material-ui/RaisedButton'

class CheckIn extends Component {

    constructor(props) {
        super()
        this.state = {
            lock: false,  //CHANGE BACK AFTER TEST
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
        if(this.props.routeId<1) {
            this.props.deleteCurrentRoute()
        }
        this.setState({ hideNextPlaces: false, hideGame: false })
        const place = this.props.place
        const experience = {
            lat: place.lat,
            lon: place.lon,
            wikiPageId: place.pageid,
            headlines: this.props.headlines,
        }
        this.props.gettingExperience(experience, this.props.routeId, this.props.userId)
        this.setState({ checkin: true })
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
        //CHANGE BACK AFTER TEST
        // if (distance <= 200) this.setState({ lock: false })
        // if (distance > 200) this.setState({ lock: true })
    }

    render() {

        if (this.state.lock) {
            return (
                <p> You are too far to check in! Please approach this place!</p>
            )
        }
        else if (this.state.checkin) {
            return (
                <div>
                    <Link to={'/next_experience'} >
                        <RaisedButton label="Onward!" style={{ margin: 12 }} />
                    </Link>
                    <Link to={'/game'} >
                        <RaisedButton label="Play a game!" style={{ margin: 12 }} />
                    </Link>
                </div>
            )
        }
        else return (
            <button type="button" className="btn btn-success" onClick={this.handleClick}>Check In</button>
        )


    }
}


const mapState = state => {
    return {
        place: state.selectedPlace,
        currentLocation: state.currentLocation,
        synopsis: state.synopsis,
        headlines: state.headlines,
        routeId: state.routeId,
        userId: state.user.id
    }
}

const mapDispatch = dispatch => {
    return {
        fetchAllNext: (lat, long) => {
            dispatch(fetchAllNext(lat, long))
        },
        gettingExperience: (experience, routeId, userId) => {
            dispatch(gettingExperience(experience, routeId, userId))
        },
        deleteCurrentRoute: () => {
            dispatch(deleteCurrentRoute())
        }
    }
}

export default connect(mapState, mapDispatch)(CheckIn)