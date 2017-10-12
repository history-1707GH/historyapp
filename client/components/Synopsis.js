import React, { Component } from 'react'
import { connect } from 'react-redux'
import CheckIn from './CheckIn'
import { NavLink } from 'react-router-dom'
import { fetchExperienceData } from '../store'
import RaisedButton from 'material-ui/RaisedButton'
import Center from 'react-center'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import {  teal500, teal900, white } from 'material-ui/styles/colors'
import Pause from 'material-ui/svg-icons/av/pause-circle-filled'
import Play from 'material-ui/svg-icons/av/play-circle-outline'
import IconButton from 'material-ui/IconButton'

class Synopsis extends Component {

  constructor(props) {
    super()
    this.state = {
      synopsisText: "",
      expanded: false,
      voice: false,
      pauseVoice: false
    }
    this.handleExpand = this.handleExpand.bind(this)
    this.handleExpandChange = this.handleExpandChange.bind(this)
    this.handleReduce = this.handleReduce.bind(this)
    this.handleListen= this.handleListen.bind(this)
    this.handleStopListen = this.handleStopListen.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handleResume = this.handleResume.bind(this)
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
  }

  handleExpand = () => {
    this.setState({expanded: true});
  }

  handleReduce = () => {
    this.setState({expanded: false});
  }

  handleListen = () => {
    this.setState({voice:true})
    responsiveVoice.speak($(this.state.synopsisText).text())
  } 

  handleStopListen = () => {
    this.setState({voice:false})
    responsiveVoice.cancel()
  }

  handlePause = () => {
    this.setState({pauseVoice:true})
    responsiveVoice.pause()
  } 

  handleResume = () => {
    this.setState({pauseVoice:false})
    responsiveVoice.resume()
  }

  render() {
    const html = { __html: this.state.synopsisText }
    const { info, archives, headlines, route } = this.props
    let getImg='/images/default-synopsis-img.jpg'
    let num = route.filter(x => {return x.id}).length + 1
    if (info) {
      info.text['*'].includes('src=') ? getImg = `https://${info.text['*'].split("src=")[1].split('width')[0].slice(3, -2)}` : getImg
    }
    return (
      <div className="synopsis-page">
        {
          (!info) ? null : 
          <Card className="synopsis" expanded={this.state.expanded} onExpandChange={this.handleChange}>
            <CardHeader
              title={`Location ${num}:  ${info.displaytitle}`} 
              actAsExpander={true}
            />
            <CardMedia>
              <img src={getImg} className="synopsis-main-image" alt="" />
            </CardMedia>
            <CardTitle title={info.displaytitle} />
            <CheckIn style={{labelColor:teal500, color:teal900}}/>
            <Center>
              <CardActions>
                <NavLink to='/headlines'>
                  <FlatButton type="button" label="News Reel" style={{ color:white, backgroundColor:teal500 }}/>
                </NavLink> 
                <NavLink to='/archives'>
                  <FlatButton type="button" label="Archives" style={{ color:white, backgroundColor:teal500 }}/>
                </NavLink> 
                {
                  !this.state.voice ? 
                  <FlatButton label="Listen" onClick={this.handleListen} style={{ color:white, backgroundColor:teal500 }}/> : 
                  <FlatButton label="Stop" onClick={this.handleStopListen} style={{ color:white, backgroundColor:teal500 }} /> 
                }
              </CardActions>
              </Center>
              <Center>
              <CardActions>
                {
                  !this.state.voice ? null : ( !this.state.pauseVoice ? <IconButton onClick={this.handlePause}><Pause color={teal900} /></IconButton> : <IconButton onClick={this.handleResume}><Play  color={teal900} /></IconButton>)
                } 
                <FlatButton label="Expand" onClick={this.handleExpand} style={{ color:teal900, backgroundColor:white }}/>    
            </CardActions>
            </Center>
            <CardActions>
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
        }
      </div>
    )
  }
}


const mapState = state => {
  return {
    synopsis: state.synopsis,
    place: state.selectedPlace,
    currentLocation: state.currentLocation,
    info: state.synopsisParse.parse,
    headlines: state.headlines,
    archives: state.archives,
    route: state.currentRoute
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
