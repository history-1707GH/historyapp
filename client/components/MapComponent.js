import React from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { fetchNearbyPlaces, selectedPlace } from '../store'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'



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
    nearbyPlaces: state.nearbyPlaces
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
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