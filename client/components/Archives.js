import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArchiveData } from '../store'


class Archives extends Component {
  constructor(props) {
    super()
  }

  componentDidMount(){
    const place = this.props.place
    const query = `body.search("${place.title}")ANDglocations:("New York City")`
    this.props.setArchives(query)
  }

  render() {
    let archivesArr = this.props.archives
    return (
      <div>
        {
          archivesArr.length > 1 && archivesArr.map(entry => {
            let timeMachine_id = entry.web_url.split("res=")
            [1]
            let timeMachineUrl = `http://timesmachine.nytimes.com/svc/tmach/v1/refer?res=${timeMachine_id}`
            return <a href={timeMachineUrl} target="_blank">Click me!</a>
          } 
        )
        }
      </div>
    )
  }
}

const mapState = state => {
  return {
    archives: state.archives,    
    place: state.selectedPlace
  }
}

const mapDispatch = dispatch => {
  return {
    setArchives: archiveQuery => {
      dispatch(fetchArchiveData(archiveQuery))
    }
  }
}


export default connect(mapState, mapDispatch)(Archives);


