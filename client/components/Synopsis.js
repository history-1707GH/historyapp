import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckIn from './CheckIn'
import { NavLink } from 'react-router-dom'
import { fetchExperienceData } from '../store'
import RaisedButton from 'material-ui/RaisedButton'
import Center from 'react-center'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


class Synopsis extends Component {

  constructor(props) {
    super()
    this.state = {
      synopsisText: ""
    }
  }

  componentDidMount() {
    const place = this.props.place
    const headlineQuery = `"${place.title}"+"New York"`
    this.props.fetchExperienceData(place.pageid, place.title, headlineQuery)   
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.synopsis !== this.props.synopsis) {
      this.setState({ synopsisText: nextProps.synopsis.content })
    }
  }

  render() {
    const html = { __html: this.state.synopsisText }
    const info = this.props.synopsisParse
    let getImg;
    let num = 1;
    if (info) {
      info ? getImg = `https://${info.text['*'].split("src=")[1].split('width')[0].slice(3, -2)}` : getImg = 'https://media.timeout.com/images/101705313/image.jpg'
      // console.log ( nlp(info.text['*']).dates().data())
      // console.log ( nlp(info.text['*']).organizations().data())
      console.log( nlp(info.text['*']).people().data() )     
    }
    return (
      <div>
        {
          info ? (
            <Card className="synopsis">
              <CardHeader
                title={`Location: ${num}`}
              />
              <CardMedia>
                <img src={getImg} className="synopsis-main-image" alt="" />
              </CardMedia>
              <CardTitle title={info.displaytitle} />
              <CardActions>
                <NavLink to='headlines'>
                  <FlatButton type="button" label="News Reel" />
                </NavLink>
              </CardActions>
              <CardText>
                <div dangerouslySetInnerHTML={html} />
              </CardText>
            </Card>
          ) : null
        }
        <Center>
          <CheckIn />
        </Center>

      </div>
    )
  }
}


const mapState = state => {
  return {
    synopsis: state.synopsis,
    place: state.selectedPlace,
    currentLocation: state.currentLocation,
    synopsisParse: state.synopsisParse.parse
  }
}

const mapDispatch = dispatch => {
  return {
    fetchExperienceData: (wikiPageId, wikiPageTitle, headlineQuery) => {
      dispatch(fetchExperienceData(wikiPageId, wikiPageTitle, headlineQuery))
    }
  }
}


export default connect(mapState, mapDispatch)(Synopsis)