import React, { Component } from 'react'

import { connect } from 'react-redux'




class Orientation extends Component {

  constructor(props) {
    super()
    this.state = {
      webkitalpha: "",
      alpha: "",
      
    }
    this.deviceOrientationListener = this.deviceOrientationListener.bind(this)
  }

  componentDidMount() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", this.deviceOrientationListener);
    } else {
      alert("Sorry, your browser doesn't support Device Orientation");
    }

    let video = document.getElementById('video');
    
    if(navigator.mediaDevices && (navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitgetUserMedia)) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } }).then(function(stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        })

      }
  }


  deviceOrientationListener(event) {
    if (event.webkitCompassHeading) {
      this.setState({ webkitalpha: Math.floor(event.webkitCompassHeading) })

    }
    else this.setState({ alpha: Math.floor(event.alpha) })




  }

  




  render() {
    const {currentLocation, selectedPlace} = this.props
    return (
      <div>
        <video className='wrapper'  id="video" autoplay>
        </video>
        <p> webkitalpha is here: </p>
        <p>{this.state.webkitalpha}</p>
        <p>currentLocationlat:{currentLocation[0]}</p>
        <p>currentLocationlon:{currentLocation[1]}</p>
        <p>selectedPlacelat:{selectedPlace.lat}</p>
        <p>selectedPlacelon:{selectedPlace.lon}</p>

       
      </div>
    )
  }
}


const mapState = state => {
  console.log('currentLocation', state.currentLocation)
  return {
    currentLocation: state.currentLocation,
    selectedPlace: state.selectedPlace
  }
}

const mapDispatch = dispatch => {
  return {

  }
}

export default connect(mapState, mapDispatch)(Orientation)
