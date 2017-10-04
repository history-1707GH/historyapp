import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchSynopsis, fetchSynopsisParse } from '../store'
import Checkout from './Checkout'
import RaisedButton from 'material-ui/RaisedButton'
import ReactTextCollapse from 'react-text-collapse'
import Center from 'react-center'


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

    const TEXT_COLLAPSE_OPTIONS = {
      collapse: false, // default state when component rendered
      collapseText: '... show more', // text to show when collapsed
      expandText: 'show less', // text to show when expanded
      minHeight: 100, // component height when closed
      maxHeight: 3000 // expanded to
    }

    return (
      <div>
        <ReactTextCollapse
          options = {TEXT_COLLAPSE_OPTIONS}> 
          <p>
            <div dangerouslySetInnerHTML={html} />
          </p>
        </ReactTextCollapse> 
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