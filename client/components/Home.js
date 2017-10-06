import React, {Component} from 'react'
import Center from 'react-center'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {  teal500} from 'material-ui/styles/colors'



export default class Home extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    document.body.className="home";
  }

  componentWillUnmount(props){
    document.body.className=null;
  }

  render(props){
    return(
      <div className="home-root">
        <br/>
        <br /> 
        <Center>
          <div>
            <img src="/meander-logo-white.png" className="meander-logo"/>
          </div>
        </Center>
        <Center>
          <div>
            <br/>
            <br/>
            <Center>
              <div><img src="/girl.png"/></div>
            </Center>
            <br/>
            <br/>
            <Center> <div>Build your own adventure!</div> </Center>
            <br/>
            <br/>
            <Center>
            <Link to="/login?redirect=map">
              <RaisedButton 
                label="Login / Sign Up" 
                backgroundColor={teal500}
               />
            </Link>
            </Center>
          </div>
        </Center>
        <br/>
        <br/>
        <Center>
          <div>
            <Link to="/map">
              <FlatButton label="Continue to map -->" />            
            </Link>
          </div>
        </Center>
      </div>
    )
  }
}

