import React, {Component} from 'react'
import Center from 'react-center'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {  teal500, white } from 'material-ui/styles/colors'
import { connect } from 'react-redux'


class Home extends Component {
  constructor(props){
    super(props)
  }

  render(props){
    return(
      <div className="home-root">
        <br/>
        <br /> 
        <Center>
          <div>
            <img src="/images/meander-logo-white.png" className="meander-logo"/>
          </div>
        </Center>
        <Center>
          <div>
            <br/>
            <br/>
            <Center>
              <div><img src="/images/girl.png"/></div>
            </Center>
            <br/>
            <br/>
            <Center> <div>Build your own adventure!</div> </Center>
            <br/>
            <br/>
            <Center>
              {
                this.props.currentUser.email ? null :
                <Link to="/login?redirect=map">
                  <RaisedButton 
                    label="Login / Sign Up" 
                    backgroundColor={teal500}
                    labelColor={white}
                  />
                </Link>
              }
            </Center>
          </div>
        </Center>
        <br/>
        <br/>
        <Center>
          <div>
            <Link to="/map">
              <FlatButton style={{color:white}} label="Continue to map -->"/>            
            </Link>
          </div>
        </Center>
      </div>
    )
  }
}

const mapState = state => {
  return {
    currentUser: state.user
  }
}

const mapDispatch = null

export default connect(mapState, mapDispatch)(Home)

