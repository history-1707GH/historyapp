import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {teal900} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import Center from 'react-center';
import { Link } from 'react-router-dom';

// import { connect } from 'react-redux';

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
    const styles = {
      title: {
        cursor: 'pointer',
      },
    };
    return(
      <div>
      <AppBar
        title={<span style={styles.title}>meander</span>}
        iconElementLeft={<IconButton></IconButton>}
        iconElementRight={<FlatButton label="Login / Sign Up" />}
        style={{backgroundColor:teal900}}
      />
        <Center>
          <div>
            <img src="/meander-logo-white.png" className="meander-logo"/>
          </div>
        </Center>
      </div>
    )
  }
}

