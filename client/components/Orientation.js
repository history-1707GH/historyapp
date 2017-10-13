import React, { Component } from 'react'
import Toggle from 'material-ui/Toggle';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { teal900, teal500, white } from 'material-ui/styles/colors'
import calculations from '../calculations'
import FlatButton from 'material-ui/FlatButton'



class Orientation extends Component {

  constructor(props) {
    super()
    this.state = {
      webkitalpha: "",
      alpha: "",
      video: "",
      angle: ""

    }
    this.deviceOrientationListener = this.deviceOrientationListener.bind(this)
    this.drawStar = this.drawStar.bind(this)
  }

  componentDidMount() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", this.deviceOrientationListener);
    } else {
      alert("Sorry, your browser doesn't support Device Orientation");
    }

    this.setState({ video: document.getElementById('video') })
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    const facingMode = "enviroment";
    const constraints = {
      audio: false,
      video: {
        facingMode: facingMode
      }
    }

    navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
      video.srcObject = stream;
      video.play();
    });
  }
  componentWillUnmount() {

    this.setState({ video: "" })
  }

  deviceOrientationListener(event) {
    if (event.webkitCompassHeading) {
      this.setState({ webkitalpha: event.webkitCompassHeading })

    }
    else this.setState({ alpha: event.alpha })
    const { currentLocation, selectedPlace } = this.props
    const c = document.getElementById("myCanvas");
    const ctx = c.getContext("2d");
    const angle = calculations.getAngle(currentLocation[0], currentLocation[1], selectedPlace.lat, selectedPlace.lon)
    this.setState({ angle: angle })
    const title = selectedPlace.title
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "green";
    ctx.font = "900 25px impact";
    ctx.fillText(title, 10 + (angle - this.state.webkitalpha) * 5, 200);
    this.drawStar(50 + (angle - this.state.webkitalpha) * 5, 160, 5, 10, 6)

  }

  drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;
    const c = document.getElementById("myCanvas");
    const ctx = c.getContext("2d");
    ctx.strokeSyle = "#000";
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius)
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y)
      rot += step

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y)
      rot += step
    }
    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#EDF364';
    ctx.stroke();
    ctx.fillStyle = '#EDF364';
    ctx.fill();

  }


  render() {
    const { currentLocation, selectedPlace } = this.props
    const distance = calculations.getDistance(currentLocation[0], currentLocation[1], selectedPlace.lat, selectedPlace.lon)

    return (
      <div>
        <video className='wrapper' id="video" width={window.innerWidth} height={window.innerHeight} autoplay>
        </video>
        <canvas id="myCanvas" width={window.innerWidth} height={window.innerHeight} >
        </canvas>
        <div id="mybutton">
          {distance <= 2 ? (
            <Link to="/synopsis">
              <FlatButton label="Arrived!" style={{ color: white, backgroundColor: teal500 }} />
            </Link>
          ) : null}

        </div>
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

const mapDispatch = (dispatch, ownProps) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(Orientation)
