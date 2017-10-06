import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';




class ProgressBar extends React.Component {

  state = {
    finished: false,
    placeIndex: 0,
    visitedPlace: []
  }

  createPlacesArr() {
    let placesArr = [];
    for (let i = 0; i <= 4; i++) {
      placesArr.push(i);
    }
    return placesArr;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checkinPlace !== this.props.checkinPlace) {
      if(this.state.visitedPlace.length < 5)
      this.state.visitedPlace.push(nextProps.checkinPlace)
      else {
        this.state.visitedPlace = []
        this.state.visitedPlace.push(nextProps.checkinPlace)
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
              <Step key={placeId}>  
                <StepLabel>{visitedPlace[placeId]? visitedPlace[placeId].title : "to be explored"}</StepLabel>
                <StepContent>
                  <p>
                    User's notes show here.
                  </p>
                  <div style={{ margin: '12px 0' }}>
                    
                    <FlatButton
                      label={placeIndex === 4 ? 'Congratulations!' : 'Next'}
                      disableTouchRipple={true}
                      disableFocusRipple={true}
                      primary={true}
                      onClick={this.handleNext}
                      style={{ marginRight: 12 }}
                    />
                    
                  </div>
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
    checkinPlace : state.checkinPlace
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(ProgressBar)