import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MapComponent from './MapComponent'
import { Route} from 'react-router-dom'
import {getNextExperiences} from '../store'



function NextExperience(props) {
  //get a list of all nouns in the Wiki text 
  const textToParse = props.synopsis.content
  const topics = nlp(textToParse).nouns().data()
  const nearbyPlaces = props.nearbyPlaces
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
  props.getNextExperiences(nextExperiences)

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

  return (
    <div>
      {nextExperiences.map((nextPlaceChoice, idx) => {
        return (
          <div key={nextPlaceChoice.pageid}>
            {`Choice ${idx + 1}`}: 
              {nextPlaceChoice.title}
            <br />
            Association: 
              {nextPlaceChoice.maxSimilarity.noun.toUpperCase()}
            <br />
            Association Score: 
                {`${(Math.ceil(nextPlaceChoice.maxSimilarity.similarity*10000)/100)}%`}
            <br />
            Distance: 
              {Math.floor((nextPlaceChoice.dist * 100 / 5280)) / 100}
          </div>
        )
      })}
      <Link to={'/map'} >Take Me To The Map!</Link>      
    </div>
  )

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

