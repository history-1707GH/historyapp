import React from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { fetchNearbyPlaces, selectedPlace, fetchCurrentLocation } from '../store'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { secrets_TFOREST_API_KEY } from '../../secrets'


class MapComponent extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
        this.props.fetchCurrentLocation()
        this.props.fetchNearbyPlaces(this.props.currentLocation)
      
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.currentLocation !== this.props.currentLocation) this.props.fetchNearbyPlaces(nextProps.currentLocation)
  }
  

  render() {
    const position = this.props.currentLocation
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
              <Marker position={[place.lat, place.lon]} key={place.pageid} >
                <Popup>
                  <span onClick = {()=>this.props.handleClick(place)}>
                    
                      {place.title} 
                    
                  </span>

                </Popup>
              </Marker>
            )
            )
          }
        </Map>
      </div>
    )
  }
}

const mapState = state => {
  return {
    nearbyPlaces: state.nearbyPlaces,
    currentLocation: state.currentLocation
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchCurrentLocation: function(){
      dispatch(fetchCurrentLocation())
    },
    fetchNearbyPlaces: function (position) {
      dispatch(fetchNearbyPlaces(position))
    },
    
    handleClick: function(place){ 
      dispatch(selectedPlace(place))
      ownProps.history.push('/synopsis')
    }
  }
}

export default connect(mapState, mapDispatch)(MapComponent)