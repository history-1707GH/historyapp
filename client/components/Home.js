import React, {Component} from 'react'
import Center from 'react-center'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'



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
      <div>
        <Center>
          <div>
            <img src="/meander-logo-white.png" className="meander-logo"/>
          </div>
        </Center>
        <Center>
          <div>
            <Link to="/login">
              <RaisedButton label="Login" style={{margin:12}} />
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

