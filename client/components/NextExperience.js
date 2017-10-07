import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Route} from 'react-router-dom'
import { getNextExperiences } from '../store'
import RaisedButton from 'material-ui/RaisedButton'
import {  teal500, teal900, white } from 'material-ui/styles/colors'
import {GridList, GridTile} from 'material-ui/GridList'
import ProgressBar from './ProgressBar'
import Center from 'react-center'
import InfoIcon from 'material-ui/svg-icons/action/info'
import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'


class NextExperience extends Component{
  constructor(props){
    super(props)
    this.state = {
      open1: false,
      open2: false
    }
    this.handleOpen1 = this.handleOpen1.bind(this)
    this.handleOpen2 = this.handleOpen2.bind(this)
    this.handleClose1 = this.handleClose1.bind(this)
    this.handleClose2 = this.handleClose2.bind(this)
  }

  handleOpen1(){
    this.setState({
      open1: true
    })
  }

  handleOpen2(){
    this.setState({
      open2: true
    })
  }

  handleClose1(){
    this.setState({
      open1: false
    })
  }

  handleClose2(){
   this.setState({
      open2: false
    })
  }
  
  render() {
    //get a list of all nouns in the Wiki text 
    const textToParse = this.props.synopsis.content
    const topics = nlp(textToParse).nouns().data()
    const nearbyPlaces = this.props.nearbyPlaces
    let nextExperiences = []
  
    //determine the topic with the greatest similarity score to each nearby place; add to the nearby place object
    if (topics[0]) {
      nearbyPlaces.forEach(place => {
        place.maxSimilarity = { noun: topics[0].singular, similarity: similarity(place.title, topics[0].singular) }
        for (let i = 0; i < topics.length; i++) {
          let newSim = similarity(place.title, topics[i].singular)
          if (newSim > place.maxSimilarity.similarity) {
            place.maxSimilarity = { noun: topics[i].singular, similarity: newSim }
          }
        }
      })
  
      //rank nearby places by maximum similarity score 
      const rankedNearbyPlaces = nearbyPlaces.sort((a, b) => {
        return b.maxSimilarity.similarity - a.maxSimilarity.similarity
      })
      //remove any stray html tags from from the nouns
      nextExperiences = rankedNearbyPlaces.slice(0, 2)
      nextExperiences.forEach(place=>{
        let noun = place.maxSimilarity.noun
        while(noun.indexOf('<')!==-1){
          let indexOfEndOfTag = noun.indexOf('>')
          noun = noun.slice(indexOfEndOfTag+1)
          place.maxSimilarity.noun = noun
        }
       })
    }
    //put the next experiences on the store
    this.props.getNextExperiences(nextExperiences)
  
    //uses editDistance (based on Levenshtein distance algorithm) to calculate a distance score between two strings (0 to 1)
    function similarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }
  
    //determines the edit distance between two strings
    function editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();
  
      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0)
            costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),
                  costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0)
          costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    }
    
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        overflowY: 'auto',
        margin: 20
      },
    }

    const actions1 = [
      <FlatButton label="OK" primary={true} onClick={this.handleClose1}/>
    ] 

    const actions2 = [
      <FlatButton label="OK" primary={true} onClick={this.handleClose2}/>
    ]

    return (
      <div>
        <div style={styles.root}>
          <GridList
            style={styles.gridList}
            >
            {
              nextExperiences.length > 1 && nextExperiences.map( nextPlaceChoice => {
                return (
                  <GridTile
                    key={nextPlaceChoice.pageid}
                    title={nextPlaceChoice.title}
                    actionIcon={<IconButton onClick={ nextExperiences.indexOf(nextPlaceChoice) === 0 ? this.handleOpen1 : this.handleOpen2}><InfoIcon color="white" /></IconButton>}                  
                    subtitle={<span>Distance: <b>{Math.floor((nextPlaceChoice.dist * 100 / 5280)) / 100}
                    </b></span>}
                  >
                    <img className="next-icon" src="/images/cityscape.png" />
                  </GridTile>
                )}
              )
            }
          </GridList> 
        </div>
        <div>
          <Dialog
          title={nextExperiences[0].title}
          actions={actions1}
          modal={false}
          open={this.state.open1}
          onRequestClose={this.handleClose1}
          >  The actions in this window were passed in as an array of React objects.
          </Dialog>
          <Dialog
          title={nextExperiences[1].title}
          actions={actions2}
          modal={false}
          open={this.state.open2}
          onRequestClose={this.handleClose2}
          >  The actions in this window were passed in as an array of React objects.
          </Dialog>
        </div>
        <Center>
          <Link to={'/map'} >
            <RaisedButton label="Take Me To The Map!" labelColor={white} backgroundColor={teal500}/>
          </Link>  
        </Center>
          <div className="progress-next">
            <ProgressBar /> 
          </div>   
      </div>
    )

  }
}

const mapState = state => {
  return {
    nearbyPlaces: state.nearbyPlaces,
    synopsis: state.synopsis
  }
}

const mapDispatch=dispatch => {
  return {
    getNextExperiences: function(nextExperiences){
      dispatch(getNextExperiences(nextExperiences))
    }
  }
}

export default connect(mapState, mapDispatch)(NextExperience)

