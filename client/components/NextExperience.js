import React from 'react'
import { connect } from 'react-redux'

function NextExperience(props) {
  const textToParse = props.synopsis.content
  console.log("textToParse", textToParse)
  const topics = nlp(textToParse).nouns().data()
  console.log("topics", topics)
  // locationsArray = topics.reduce(topic => {
ç

  // }, [])

  return (
    <div>Next Up!</div>
  )

}

const mapState = state => {
  return {
    synopsis: state.synopsis
  }
}

export default connect(mapState)(NextExperience)

//get a lits of all landmarks within 1 or 0.5 miles of user and parse text looking for a referece to that like I did w the map OR compare the topics array or nouns array to that