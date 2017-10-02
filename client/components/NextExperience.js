import React from 'react'
import {connect} from 'react-redux'

 function NextExperience(props) {
  const textToParse = props.synopsis.content
  console.log("textToParse", textToParse)
  const locations = nlp(textToParse).topics().data()
  console.log('places', locations)

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