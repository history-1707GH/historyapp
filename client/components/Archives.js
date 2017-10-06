import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchArchiveData } from '../store'
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List'

class Archives extends Component {
  constructor(props) {
    super()
    this.createDate = this.createDate.bind(this);    
  }

  componentDidMount(){
    const place = this.props.place
    const query = `body.search("${place.title}")ANDglocations:("New York City")`
    this.props.setArchives(query)
  }

  createDate(dateNum){
    return new Date(dateNum).toString().split(' ').slice(0,4).join(' ');
  }

  render() {
    let archivesArr = this.props.archives
    return (
      <div>
        <Paper>
          <List>
            <div><img src="/archive.jpg" className="archives-banner"/></div>
            {
              archivesArr.length > 1 && archivesArr.map(entry => {
                if (entry.web_url.includes('query.nytimes')) {
                  let timeMachine_id = entry.web_url.split("res=")[1]
                  let timeMachineUrl = `http://timesmachine.nytimes.com/svc/tmach/v1/refer?res=${timeMachine_id}`
                  return (
                    <a href={timeMachineUrl} target="_blank"> 
                      <ListItem primaryText={entry.headline.main.slice(0,49)}
                                secondaryText={this.createDate(entry.pub_date)}> </ListItem>
                    </a>
                )}
              } 
            )
            }
          </List>
        </Paper>
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

