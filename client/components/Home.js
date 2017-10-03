import React, {Component} from 'react';
import Center from 'react-center';
import { Link } from 'react-router-dom';


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
      </div>
    )
  }
}

