import React, {Component} from 'react';
import store from '../store';
import AppBar from 'material-ui/AppBar';
import {teal900} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

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
    const styles = {
      title: {
        cursor: 'pointer',
      },
    };
    return(
      <AppBar
        title={<span style={styles.title}>meander</span>}
        iconElementLeft={<IconButton></IconButton>}
        iconElementRight={<FlatButton label="Login / Sign Up" />}
        style={{backgroundColor:teal900}}
      />
    )
  }
}

