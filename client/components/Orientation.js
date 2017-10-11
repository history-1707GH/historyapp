import React, { Component } from 'react'

import { connect } from 'react-redux'




class Orientation extends Component {

  constructor(props) {
    super()
    this.state = {
      webkitalpha: "...",
      alpha: "...",
      beta: "...",
      gamma: "..."
    }
    this.deviceOrientationListener = this.deviceOrientationListener.bind(this)
  }

  componentDidMount() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", this.deviceOrientationListener);
    } else {
      alert("Sorry, your browser doesn't support Device Orientation");
    }

  }


  deviceOrientationListener(event) {
    if (event.webkitCompassHeading) {
      this.setState({ webkitalpha: Math.floor(event.webkitCompassHeading) })

    }
    else this.setState({ alpha: Math.floor(event.alpha) })



    this.setState({ beta: Math.floor(event.beta) })
    this.setState({ gamma: Math.floor(event.gamma) })

  }

  // calculateAngleFromNorthPole(lat1, lon1, lat2, lon2) {

  // }




  render() {

    return (
      <div>
        <h1> webkitalpha is here: </h1>
        <p>{this.state.webkitalpha}</p>
        <h1> alpha is here: </h1>
        <p>{this.state.alpha}</p>
        <h1> beta is here: </h1>
        <p>{this.state.beta}</p>
        <h1> gamma is here: </h1>
        <p>{this.state.gamma}</p>
      </div>
    )
  }
}


const mapState = state => {
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
