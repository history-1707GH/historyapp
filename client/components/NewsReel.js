import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { fetchHeadlines } from '../store';


class NewsReel extends Component {
  constructor(props){
      super(props)
  }

  componentDidMount(){
    const fakeQuery = 'New York Stock Exchange Great Depression';
    store.dispatch(fetchHeadlines(fakeQuery.toLowerCase().split(' ').join('+')));
  }

  render() {
    let headlinesArr = this.props.headlines;
    let fakeQuery = 'New York Stock Exchange Great Depression';    
    return (
      <div>
        {
          headlinesArr.length && headlinesArr.map(headline => {
            return <p key={headlinesArr.indexOf(headline)}>{headline.snippet}</p>
          })
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


export default connect(mapState)(NewsReel);


