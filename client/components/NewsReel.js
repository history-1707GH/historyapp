import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Slider from 'react-slick'
import {  teal500, teal900, white, grey800 } from 'material-ui/styles/colors'
import Center from 'react-center'




class NewsReel extends Component {
  constructor(props){
      super(props)
      this.createDate = this.createDate.bind(this);
  }
 

  createDate(dateNum){
    return new Date(dateNum).toString().split(' ').slice(0,4).join(' ');
  }

  render() {
    let headlinesArr = this.props.headlines;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
      swipeToScroll: true
    };
    return (
      <div className="newsreel-page">
        <div>
        {
          headlinesArr.length ? (
            <Slider {...settings}> 
            {
              headlinesArr.map(headline =>  {
                return (            
                  <Card key={headlinesArr.indexOf(headline)} className="headline-reel">
                    <CardHeader
                      title={`${headline.headline.main.slice(0, 25)}...`} subtitle={`New York Times - ${this.createDate(headline.pub_date)}`}/>
                    <CardMedia>
                      {
                        !headline.web_url.includes("query") ? 
                        <a href={headline.web_url} target="_blank">
                        {
                          headline.multimedia.length >= 1 ? 
                          <img src={`https://static01.nyt.com/${headline.multimedia[0].url}`} alt="" /> : 
                          <img src="/images/history-pic.jpg" alt="" />
                        }
                        </a> : <a href={`http://timesmachine.nytimes.com/svc/tmach/v1/refer?res=${headline.web_url.split("res=")[1]}`} target="_blank">
                        {
                          headline.multimedia.length > 1 ? 
                          <img src={`https://static01.nyt.com/${headline.multimedia[1].url}`} alt="" /> : 
                          <img src="/images/history-pic.jpg" alt="" />
                        }
                        </a>
      
                      }
                    </CardMedia>
                    <CardTitle title={`${headline.headline.main.slice(0, 20)}...`} subtitle={!headline.byline ? null : headline.byline.original} />
                    <CardText>
                      {headline.snippet}
                    </CardText>
                  </Card>
                )
              })
            } 
            </Slider>
          ) : (
            <Card key={0} className="headline-reel">
            <CardHeader
              title={null}/>
            <Center>
              <CardText color={ grey800 }>
                We're sorry. No related news headlines available.
              </CardText>
            </Center>
          </Card>
          )
        }
        </div>
        <br />
        <br />
        <div>
          <Center>
            <NavLink to="/synopsis">
              <RaisedButton type="button" label="BACK" backgroundColor={ teal500 } labelColor={white}/>
            </NavLink>
          </Center>
          <br />
          <br />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    headlines: state.headlines,
    selectedPlace: state.selectedPlace
  }
}


export default connect(mapState)(NewsReel);


