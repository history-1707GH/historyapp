import React from 'react'
import {connect} from 'react-redux'

 function NextExperience(props) {
  const textToParse = props.synopsis.content
  const locations = nlp(textToParse).topics().data()

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