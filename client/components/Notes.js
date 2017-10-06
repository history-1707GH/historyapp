import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { fetchSynopsis, fetchAllNext, checkinPlace} from '../store'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


class Notes extends Component {

    constructor(props) {
        super()
       
    }
    render() {  
        return (
           
               <div className="container notes">
        <br />
        <h3 className="note-header"> Notes </h3>
          {
          <div className='add-note-form'>
            <RaisedButton label="Add a Note"
              primary={true}
             
            />
            <br />
            <Dialog
              title={`Write a Note for ${this.props.checkinPlace.title}`}
              
              modal={true}
              
              autoScrollBodyContent={true}
            >
              <form >
               
                <TextField
                  hintText="Write your note here"
                  floatingLabelText="Note"
                  name="note"
                  fullWidth={true}
                  multiLine={true}
                  
                />
              
                <br />
              </form>
            </Dialog>
            <br />
            </div>
          }
         
           </div>
        )


    }
}


const mapState = state => {
    return {
        checkinPlace: state.checkinPlace
    }
}

const mapDispatch = dispatch => {
    return {
        
    }
}

export default connect(mapState, mapDispatch)(Notes)