import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { teal500, teal900, white, grey400 } from 'material-ui/styles/colors'
import StartNewJourney from './StartNewJourney'
import UserRoutes from './UserRoutes'
import Center from 'react-center'


function ProgressBar(props) {

  const nextRouteIndex = props.currentRoute.findIndex(experience => !experience.id)
  const placeIndex = nextRouteIndex > 0 ? nextRouteIndex - 1 : 4
  console.log('placeIndex', placeIndex)

  return (

    <div>
      <Center>
        <Link to={'/map'} >
          {placeIndex<4 ? <RaisedButton label="Take Me To The Map!" labelColor={white} backgroundColor={teal500} /> : <StartNewJourney/>}
        </Link>
      </Center>

      <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
        <Stepper activeStep={placeIndex} orientation="vertical">
          {
            props.currentRoute.map((experience, idx) => {
              let date = new Date(experience.createdAt).toLocaleString
              return (
                <Step key={idx} style={{ color: grey400, backgroundColor: teal900 }}>
                  <StepLabel style={{ color: white }}>{experience.synopsis ? experience.synopsis.title : "To Be Explored"}</StepLabel>
                  <StepContent>
                    <p>
                      {date}
                    </p>

                  </StepContent>
                </Step>
              )
            })
          }

        </Stepper>
        <UserRoutes />
      </div>
    </div>

  );
}





const mapState = state => {
  return {
    currentRoute: state.currentRoute
  }
}


export default connect(mapState)(ProgressBar)