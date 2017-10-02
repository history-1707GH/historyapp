import React from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { fetchNearbyPlaces } from '../store'
import { connect } from 'react-redux'
<<<<<<< HEAD
import { secrets_TFOREST_API_KEY } from '../../secrets'
=======
import { NavLink } from 'react-router-dom'


>>>>>>> master

class MapComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      position: [0, 0],
      error: null,
    }

  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          position: [position.coords.latitude, position.coords.longitude],
          error: null,
        });
        this.props.fetchNearbyPlaces(this.state.position)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    )

  }



  render() {
    const position = this.state.position
    const nearbyPlaces = this.props.nearbyPlaces
    
    var placeIcon = L.icon({
      iconUrl: 'https://cdn.pixabay.com/photo/2015/12/14/20/36/magnifier-1093184_1280.png',
      iconSize: [30, 42],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });

    var userIcon = L.icon({
      iconUrl: 'http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-13/512/User-Orange-icon.png',
      iconSize: [45, 45],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });

    return (
      <div id="mapid">
        <Map center={position} zoom={25}>
          <TileLayer
            url={`https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=${secrets_TFOREST_API_KEY}`}
            attribution={`&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`}
          />
          <Marker position={position} icon={userIcon}>
            <Popup>
              <span>You are here</span>
            </Popup>
          </Marker>
          {
            nearbyPlaces.length && nearbyPlaces.map(place => (
              <Marker position={[place.lat, place.lon]} key={place.pageid} icon={placeIcon}>
                <Popup> 
                  <span><a href = "/synopsis"> {place.title} </a> </span>
                </Popup>
              </Marker>)
            )
          }
        </Map>
      </div>
    )
  }
}

const mapState = state => {
  return {
    nearbyPlaces: state.nearbyPlaces
  }
}

const mapDispatch = dispatch => {
  return {
    fetchNearbyPlaces: function (position) {
      dispatch(fetchNearbyPlaces(position))
    }
  }
}

export default connect(mapState, mapDispatch)(MapComponent)