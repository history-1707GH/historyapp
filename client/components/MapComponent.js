import React from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { fetchNearbyPlaces, selectedPlace } from '../store'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { TFOREST_API_KEY } from '../../frontend_keys'



class MapComponent extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!this.props.nextExperiences.length) {
      this.props.fetchNearbyPlaces(this.props.currentLocation)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentLocation !== this.props.currentLocation) this.props.fetchNearbyPlaces(nextProps.currentLocation)
  }


  render() {
    const position = this.props.currentLocation
    const mapMarkers = this.props.nextExperiences.length ? this.props.nextExperiences : this.props.nearbyPlaces
    const mapZoom = this.props.nextExperiences.length ? 12 : 25

    var placeIcon = L.icon({
      iconUrl: '/magnifier.png',
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
        <Map center={position} zoom={mapZoom}>
          <TileLayer
            url={`https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=${TFOREST_API_KEY}`}
            attribution={`&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`}
          />
          <Marker position={position} icon={userIcon}>
            <Popup>
              <span>You are here</span>
            </Popup>
          </Marker>
          {
            mapMarkers.length && mapMarkers.map(place => {
              return (
                <Marker position={[place.lat, place.lon]} key={place.pageid} icon={placeIcon}>
                  <Popup>
                    <span onClick={() => this.props.handleClick(place)} style={{ cursor: "pointer" }}>

                      {place.title}

                    </span>

                  </Popup>
                </Marker>
              )
            })
          }
        </Map>
      </div>
    )
  }
}

const mapState = state => {
  return {
    nearbyPlaces: state.nearbyPlaces,
    currentLocation: state.currentLocation,
    nextExperiences: state.nextExperiences
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchNearbyPlaces: function (position) {
      dispatch(fetchNearbyPlaces(position))
    },
    handleClick: function (place) {
      dispatch(selectedPlace(place))
      ownProps.history.push('/synopsis')
    }
  }
}

export default connect(mapState, mapDispatch)(MapComponent)