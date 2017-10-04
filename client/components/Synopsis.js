import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSynopsis } from '../store'
import CheckIn from './CheckIn'

class Synopsis extends Component {

  constructor(props) {
    super()
    this.state = {
      synopsisText: ""
    }
  }

  componentDidMount() {
    this.props.fetchSynopsis(this.props.place.pageid)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.synopsis !== this.props.synopsis) {
      this.setState({ synopsisText: nextProps.synopsis.content })
    }
  }

  render() {
    const html = { __html: this.state.synopsisText }

    return (
      <div>
        <div dangerouslySetInnerHTML={html} />
        <br />
        <CheckIn />

      </div>
    )
  }
}


const mapState = state => {
  return {
    synopsis: state.synopsis,
    place: state.selectedPlace,
    currentLocation: state.currentLocation
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSynopsis: pageId => {
      dispatch(fetchSynopsis(pageId))
    }
  }
}


export default connect(mapState, mapDispatch)(Synopsis)