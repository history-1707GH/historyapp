import React from 'react'
import {connect} from 'react-redux'

 function NextExperience(props) {
  const textToParse = props.synopsis.content
  console.log("textToParse", textToParse)
  const topics = nlp(textToParse).topics().data()
  locationsArray = topics.reduce(topic=>{

  }, [])

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