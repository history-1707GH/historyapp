import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchSynopsis, fetchSynopsisParse } from '../store'
import Checkout from './Checkout'
import RaisedButton from 'material-ui/RaisedButton'
import Center from 'react-center'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


class Synopsis extends Component {

  constructor(props) {
    super()
    this.state = {
      synopsisText: ""
    }
  }

  componentDidMount() {
    this.props.fetchSynopsis(this.props.place.pageid)
    this.props.fetchSynopsisInfo(this.props.place.title)    
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.synopsis !== this.props.synopsis) {
      let content = nextProps.synopsis.content
      let index = 0
      let selector = ""
      if (content.includes('<span id="Menus">Menus</span>'))
        selector = '<span id="Menus">Menus</span>'
      else if (content.includes('<span id="Image_gallery">Image gallery</span>'))
        selector = '<span id="Image_gallery">Image gallery</span>'
      else if (content.includes('<span id="See_also">See also</span>'))
        selector = '<span id="See_also">See also</span>'
      else if (content.includes('<span id="References">References</span>'))
        selector = '<span id="References">References</span>'
      else if (content.includes('<span id="External_links">External links</span>'))
        selector = '<span id="External_links">External links</span>'


      index = content.indexOf(selector)
      const preparedText = content.slice(0, index);
      this.setState({ synopsisText: preparedText })
    }
  }



  render() {
    const html = { __html: this.state.synopsisText }
    const info = this.props.synopsisParse
    let getImg;
    let num = 1;
    if (info ) {
      info ? getImg = `https://${info.text['*'].split("src=")[1].split('width')[0].slice(3, -2)}` : getImg = 'https://media.timeout.com/images/101705313/image.jpg'
      console.log(getImg)
    }
    return (
      <div>
      { 
        info ? (
          <Card>
          <CardHeader
            title={`Location: ${num}`}
          />
          <CardMedia>
            <img src={getImg} className="synopsis-main-image" alt="" />
          </CardMedia>
          <CardTitle title={info.displaytitle} />
          <CardText>
            <div dangerouslySetInnerHTML={html} />
          </CardText>
          <CardActions>
            <FlatButton label="News Reel" />
          </CardActions>
          </Card>
        ) : null

      }
        <Center>
          <Checkout />
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
    fetchSynopsis: pageId => {
      dispatch(fetchSynopsis(pageId))
    },
    fetchSynopsisInfo: pageTitle => {
      dispatch(fetchSynopsisParse(pageTitle))
    }
  }
}


export default connect(mapState, mapDispatch)(Synopsis)