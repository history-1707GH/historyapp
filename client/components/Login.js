import React, {Component} from 'react';
import store from '../store';
// import { connect } from 'react-redux';
// import Center from 'react-center';

export default class Login extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    document.body.className="home";
  }

  componentWillUnmount(props){
    document.body.className=null;
  }
  
  render(){
    return(
      <div>
        <h1>Hello Testing!</h1>
      </div>
    )
  }
}


 