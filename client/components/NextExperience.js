import React from 'react'
import { connect } from 'react-redux'

function NextExperience(props) {
  //const textToParse =  pull from the thunk
  const textToParse = "For many years, Hanover Square was the center of New York's commodity market, with the New York Cotton Exchange at 1 Hanover Square, New York Cocoa Exchange (now the New York Board of Trade) and others located nearby. The square was also known as 'Printing House Square,' and it was here that the Great Fire of New York broke out on December 16, 1835, decimating much of Lower Manhattan.[4] 3 Hanover Square, a former home to the New York Cotton Exchange, and 10 Hanover Square, a former office building, have been converted to residential use."
  const topics = nlp(textToParse).nouns().data()
  console.log("topics", topics)
  const nearbyPlacesObj = props.nearbyPlaces.reduce((obj, place)=>{
    obj[place.title]=place
  }, {})
  console.log('nearbyPlacesObj', nearbyPlacesObj)
  const possibleNextExperiences = [];
  topics.forEach(topic=>{
    if(nearbyPlacesObj[topic.singular]){
      possibleNextExperiences.push(nearbyPlacesObj[topic.singular])
    }
  })
  console.log(possibleNextExperiences)

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

//get a lits of all landmarks within 1 or 0.5 miles of user and parse text looking for a referece to that like I did w the map OR compare the topics array or nouns array to that