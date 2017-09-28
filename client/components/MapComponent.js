import React from 'react'
import L from 'leaflet'
import { Map, TileLayer } from 'react-leaflet'
import {fetchNearbyPlaces} from '../store'
import {connect} from 'react-redux'


class MapComponent extends React.Component {
 
  constructor(props) {
    super(props)
    this.state = {
      position: [40.705076, -74.00916]
    }
  }

  componentDidMount(){
    console.log("this.props", this.props)
    this.props.fetchNearbyPlaces(this.state.position)
  }

  render() {
    const position = [40.705076, -74.00916]
    return (
      <div id="mapid">
        <Map center={position} zoom={25}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution={`&copy;  <a href=${'http://{s}.tile.osm.org/{z}/{x}/{y}.png'}/> Contributors`}
          />
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
    fetchNearbyPlaces: function(position) {
      dispatch(fetchNearbyPlaces(position))
    }
  }
}

export default connect(mapState, mapDispatch)(MapComponent)