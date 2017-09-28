import React from 'react'
import L from 'leaflet'
import { Map, TileLayer } from 'react-leaflet'


export default class MapComponent extends React.Component {


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

