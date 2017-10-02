import React from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { fetchNearbyPlaces, selectedPlace, fetchCurrentLocation } from '../store'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'



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
    console.log('Position', position)
    console.log('nearbyPlaces', nearbyPlaces)
    return (
      <div id="mapid">
        <Map center={position} zoom={25}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution={`&copy;  <a href=${'http://{s}.tile.osm.org/{z}/{x}/{y}.png'}/> Contributors`}
          />
          <Marker position={position}>
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