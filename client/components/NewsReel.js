import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { fetchHeadlines } from '../store';


class NewsReel extends Component {
  constructor(props){
      super(props)
      this.createDate = this.createDate.bind(this);
  }

  componentDidMount(){
    const fakeQuery = 'New York Stock Exchange Great Depression';
    this.props.setHeadlines(fakeQuery.toLowerCase().split(' ').join('+'));
  } 

  createDate(dateNum){
    return new Date(dateNum).toString().split(' ').slice(0,4).join(' ');
  }

  render() {
    let headlinesArr = this.props.headlines;
    return (
      <div>
        {
          headlinesArr.length && headlinesArr.map(headline =>  (              
              <Card key={headlinesArr.indexOf(headline)}>
                <CardHeader
                  title={`${headline.headline.main.slice(0, 30)}...`} subtitle={`New York Times - ${this.createDate(headline.pub_date)}`}/>
                <CardMedia>
                  <a href={headline.web_url}>
                  {
                    headline.multimedia.length ? 
                    <img src={`https://static01.nyt.com/${headline.multimedia[1].url}`} alt="" /> : 
                    <img src="http://www.utoledo.edu/al/history/images/historypic2.jpg" alt="" />
                  }
                  </a>
                </CardMedia>
                <CardTitle title={`${headline.headline.main.slice(0, 35)}...`} subtitle={!headline.byline ? null : headline.byline.original} />
                <CardText>
                  {headline.snippet}
                </CardText>
              </Card>
            )
          )
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

const mapDispatch = dispatch => {
  return {
    setHeadlines: query => {
       dispatch(fetchHeadlines(query));
    }
  } 
}


export default connect(mapState, mapDispatch)(NewsReel);


