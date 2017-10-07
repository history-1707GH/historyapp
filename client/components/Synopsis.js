import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckIn from './CheckIn'
import { NavLink } from 'react-router-dom'
import { fetchExperienceData } from '../store'
import RaisedButton from 'material-ui/RaisedButton'
import Center from 'react-center'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {  teal500, teal900, white } from 'material-ui/styles/colors'


class Synopsis extends Component {

  constructor(props) {
    super()
    this.state = {
      synopsisText: "",
      expanded: false
    }
    this.handleExpand = this.handleExpand.bind(this)
    this.handleExpandChange = this.handleExpandChange.bind(this)
    this.handleReduce = this.handleReduce.bind(this)
  }

  componentDidMount() {
    const place = this.props.place
    const query = `body.search("${place.title}")ANDglocations:("New York City")`
    this.props.fetchExperienceData(place.pageid, place.title, query)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.synopsis !== this.props.synopsis) {
      this.setState({ synopsisText: nextProps.synopsis.content })
    }
  } 

  handleExpandChange = expanded => {
    this.setState({expanded: expanded});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };


  render() {
    const html = { __html: this.state.synopsisText }
    const info = this.props.synopsisParse
    let getImg='https://media.timeout.com/images/101705313/image.jpg'
    let num = 1;
  }
  if (info) {
    getImg = `https://${info.text['*'].split("src=")[1].split('width')[0].slice(3, -2)}` 
    return (
      <div>
        <Card className="synopsis" expanded={this.state.expanded} onExpandChange={this.handleChange}>
          <CardHeader
            title={`${num}  -  ${info.displaytitle}`} 
            actAsExpander={true}
          />
          <CardMedia>
            <img src={getImg} className="synopsis-main-image" alt="" />
          </CardMedia>
          <CardTitle title={info.displaytitle} />
          <CardActions>
            <NavLink to='/headlines'>
              <FlatButton type="button" label="News Reel" style={{ color:white, backgroundColor:teal500 }}/>
            </NavLink>
            <NavLink to='/archives'>
              <FlatButton type="button" label="Archives" style={{ color:white, backgroundColor:teal500 }}/>
            </NavLink>
            <FlatButton label="Expand" onClick={this.handleExpand} style={{ color:teal900, backgroundColor:white }}/>                
          </CardActions>
          <CardActions>
            <CheckIn style={{labelColor:teal500, color:teal900}}/>
          </CardActions>
          <CardText expandable={true}>
            <div dangerouslySetInnerHTML={html} />
          </CardText>
          {
            this.state.expanded ? 
            <CardActions>
              <FlatButton label="Reduce" onClick={this.handleReduce} style={{ color:white, backgroundColor:teal500 }} />
            </CardActions> : null
          }
        </Card>
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
