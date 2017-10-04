import React from 'react'
import { connect } from 'react-redux'

function NextExperience(props) {
  const textToParse = props.synopsis.content
  const topics = nlp(textToParse).nouns().data()
  const nearbyPlaces = props.nearbyPlaces

  //add to nearby places an array of similarity scores that determines the 
  if (topics[0]) {
    console.log("topics", topics)
    nearbyPlaces.forEach(place => {
      place.maxSimilarity = { noun: topics[0].singular, similarity: similarity(place.title, topics[0].singular) }
      for (let i = 0; i < topics.length; i++) {
        let newSim = similarity(place.title, topics[i].singular)
        if (newSim > place.maxSimilarity.similarity) {
          place.maxSimilarity = { noun: topics[i].singular, similarity: newSim }
        }
      }
    })
    console.log('nearbyPlaces after added similarity score', nearbyPlaces)
    const rankedNearbyPlaces = nearbyPlaces.sort((a,b)=>{
      return b.maxSimilarity.similarity - a.maxSimilarity.similarity
    })
    console.log('rankedNearbyPlaces', rankedNearbyPlaces)    
  }

  //Find place with highest maximum match


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
    <div>Next Up!</div>
  )

}

const mapState = state => {
  return {
    nearbyPlaces: state.nearbyPlaces,
    synopsis: state.synopsis
  }
}

export default connect(mapState)(NextExperience)

