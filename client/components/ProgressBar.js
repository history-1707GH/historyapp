import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {  teal500, teal900, white, grey400 } from 'material-ui/styles/colors'
import EndRoute from './EndRoute'
import UserRoutes from './UserRoutes'




class ProgressBar extends React.Component {

  constructor(props) {
    super()
    this.state = {
      finished: false,
      placeIndex: 0
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
    const { finished, placeIndex } = this.state
    return (
      <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>


        <Stepper activeStep={placeIndex} orientation="vertical">
          {
            this.props.currentRoute.map((experience, idx) => {
              return (
              <Step key={idx} style={{ color:grey400, backgroundColor:teal900}}>
                <StepLabel style={{color:white}}>{experience.synopsis ? experience.synopsis.title : "To Be Explored"}</StepLabel>
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

            )})
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
        <EndRoute/>
        <UserRoutes />
      </div>
    );
  }
  
}




const mapState = state => {
  return {
    currentRoute: state.currentRoute
  }
}


export default connect(mapState)(ProgressBar)