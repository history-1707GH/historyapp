import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import store from '../store';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';

export default class NewsReel extends Component {
  constructor(props){
      super(props)
  }

  render() {
      return (
          <div>
            {
              
            }
          </div>
      )
  }
}

const mapState = state => {
  return {
    headlines: state.headlines
  }
}

// const mapDispatch = dispatch => {
//   handleClick
// }

export default connect(mapState)(NewsReel);


