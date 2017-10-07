import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { fetchSynopsis, fetchAllNext, checkinPlace} from '../store'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
 import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


class Notes extends Component {

    constructor(props) {
        super()
        this.state = {
            notes: [],
            open: false,
            userNote: '',
            dirty: false
          }
          this.handleOpen = this.handleOpen.bind(this);
          this.handleClose = this.handleClose.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOpen() {
		this.setState({ open: true });
	}
  handleClose() {
		this.setState({ open: false, dirty: false  });
    }
    
    handleSubmit(evt) {
        evt.preventDefault();
    
        const note = {
          content: this.state.userNote,
          
          experienceId: this.props.experienceId,
          userId: this.props.user.id || null
        }
    
        this.props.addNewNote(note)
        this.setState({
          open: false,
         
          userNote: '',
          dirty: false
        })
      };
    
    render() {  
        const inputValue = this.state.userNote;
        const actions =
        [
          <FlatButton label="Cancel" primary={true} onClick={this.handleClose}/>,
          <FlatButton label="Submit" primary={true} onClick={this.handleSubmit} disabled={disableSubmit}/>
        ];
        let disableSubmit = inputValue.length > 500 || inputValue.length<=0;
        return (
           
               <div className="container notes">
        <br />
        <h3 className="note-header"> Notes </h3>
          {
          <div className='add-note-form'>
            <RaisedButton label="Add a Note"
              primary={true}
              onClick={this.handleOpen}             
            />
            <br />
            <Dialog
              title={`Write a Note for ${this.props.checkinPlace.title}`}
              actions={actions}
              modal={true}
              open={this.state.open}
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
        checkinPlace: state.checkinPlace,
        notes: state.notes,
        currentUser: state.user,
        experience: state.experience
    }
}

const mapDispatch = dispatch => {
    return {
        addNewNote: function (note) {
            return dispatch(postNote(note))
          }
    }
}

export default connect(mapState, mapDispatch)(Notes)