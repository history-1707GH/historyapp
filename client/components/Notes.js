import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { fetchSynopsis, fetchAllNext, checkinPlace} from '../store'


class Notes extends Component {

    constructor(props) {
        super()
       
    }
    render() {  
        return (
           
               <div className="container review">
        <br />
        <h3 className="review-header"> Ratings & Reviews </h3>
          {
          <div className='add-review-form'>
            <RaisedButton label="Add a Review"
              primary={true}
             
            />
            <br />
            <Dialog
              title={`Write a Note for ${this.props.checkinPlace.title}`}
              
              modal={true}
              open={this.state.open}
              autoScrollBodyContent={true}
            >
              <form onSubmit={this.onSubmit}>
               
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