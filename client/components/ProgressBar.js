import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {  teal500, teal900, white, grey400 } from 'material-ui/styles/colors'





class ProgressBar extends React.Component {

  constructor(props) {
    super()
    this.state = {
      finished: false,
      placeIndex: 0,
      visitedPlace: []
    }

  }



  createPlacesArr() {
    let placesArr = [];
    for (let i = 0; i <= 4; i++) {
      placesArr.push(i);
    }
    return placesArr;
  }
  checkRepeat() {
    for (let i = 0; i < this.state.visitedPlace.length; i++) {
      if (this.state.visitedPlace[i] === this.props.checkinPlace) return false
    }
    return true
  }
  componentDidMount() {

    if (this.checkRepeat()) {
      if (this.state.visitedPlace.length < 5) {
        this.setState({ visitedPlace: [...this.state.visitedPlace, this.props.checkinPlace] })
      }

      else {
        this.state.visitedPlace = []
        this.setState({ visitedPlace: [...this.state.visitedPlace, this.props.checkinPlace] })
      }
    }

  }

  handleNext = () => {
    const { placeIndex } = this.state;
    this.setState({
      placeIndex: placeIndex + 1,
      finished: placeIndex >= 4
    })
  }

  render() {

    const { finished, placeIndex, visitedPlace } = this.state
    const placeIds = this.createPlacesArr()


    return (
      <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>


        <Stepper activeStep={placeIndex} orientation="vertical">
          {
            placeIds && placeIds.map(placeId => (
              <Step key={placeId} style={{ color:grey400, backgroundColor:teal900}}>
                <StepLabel style={{color:white}}>{visitedPlace[placeId] ? visitedPlace[placeId].title : `Location ${placeId+1}: ????` } </StepLabel>  
                <StepContent>
                  <p>
                    User's notes show here.
                  </p>
                </StepContent>
              </Step>

            ))
          }
        </Stepper>

        {finished && (
          <Link to='/map'>
            <RaisedButton
              label={'START A NEW JOURNEY'}
              disableTouchRipple={true}
              disableFocusRipple={true}
              primary={true}

              style={{ marginRight: 12 }}
            />
          </Link>

        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    checkinPlace: state.checkinPlace
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(ProgressBar)