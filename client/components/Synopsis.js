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
    const info = this.state.synopsisParse
    return (
      <div>
      {
        // <Card>
        // <CardHeader
        //   title={info.displayTitle}
        //   subtitle="Subtitle"
        // />
        // <CardMedia
        //   overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        // >
        //   <img src="images/nature-600-337.jpg" alt="" />
        // </CardMedia>
        // <CardTitle title="Card title" subtitle="Card subtitle" />
        // <CardText>
        //   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        //   Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        //   Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        //   Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        // </CardText>
        // <CardActions>
        //   <FlatButton label="Action1" />
        //   <FlatButton label="Action2" />
        // </CardActions>
        // </Card>

      }
        <div dangerouslySetInnerHTML={html} />
        <div>    
          <RaisedButton label="Headlines" fullWidth={true} />
        </div>
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