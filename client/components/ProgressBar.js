import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { teal500, teal900, white, grey400 } from 'material-ui/styles/colors'
import EndRoute from './EndRoute'
import UserRoutes from './UserRoutes'




function ProgressBar(props) {

  const nextRouteIndex = props.currentRoute.findIndex(experience=>!experience.id)
  const placeIndex = nextRouteIndex-1


  return (
    <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
      <Stepper activeStep={placeIndex} orientation="vertical">
        {
          props.currentRoute.map((experience, idx) => {
            return (
              <Step key={idx} style={{ color: grey400, backgroundColor: teal900 }}>
                <StepLabel style={{ color: white }}>{experience.synopsis ? experience.synopsis.title : "To Be Explored"}</StepLabel>
                <StepContent>
                  <p>
                    User's notes show here.
                  </p>

                </StepContent>
              </Step>
            )
          })
        }

      </Stepper>

      {placeIndex>=4 ?
         <Link to='/map'>
          <RaisedButton
            label={'START A NEW JOURNEY'}
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}

            style={{ marginRight: 12 }}
          />
        </Link>
        :
        <EndRoute />        

      }

      <UserRoutes />
    </div>
  );
}





const mapState = state => {
  return {
    currentRoute: state.currentRoute
  }
}


export default connect(mapState)(ProgressBar)