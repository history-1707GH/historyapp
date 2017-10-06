import React, {Component} from 'react'
import Center from 'react-center'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {  amber800 } from 'material-ui/styles/colors'



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
        <Center>
          <div>
            <img src="/meander-logo-white.png" className="meander-logo"/>
          </div>
        </Center>
        <Center>
          <div>
            <Link to="/login?redirect=map">
              <RaisedButton label="Login / Sign Up" 
              style={{color:amber800, margin: 12}}
               />
            </Link>
          </div>
        </Center>
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

