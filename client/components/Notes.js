import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { postNote, fetchPlaceNotes, fetchExperience } from '../store'
import {  teal500, teal900, white } from 'material-ui/styles/colors'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import Center from 'react-center'


class Notes extends Component {

    constructor(props) {
        super()
        this.state = {
            open: false,
            userNote: '',
            dirty: false
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeNote = this.changeNote.bind(this);
    }

    handleOpen() {
        this.setState({ open: true });
    }
    handleClose() {
        this.setState({ open: false, dirty: false });
    }
    changeNote(evt) {
        this.setState({
            userNote: evt.target.value,
            dirty: true
        })
    };


    handleSubmit(evt) {
        evt.preventDefault();
        const note = {
            content: this.state.userNote,
            experienceId: this.props.currentExperience.id,
            userId: this.props.currentUser.id || null
        }
        this.props.addNewNote(note, this.props.currentExperience.id)
        this.setState({
            open: false,
            userNote: '',
            dirty: false
        })
        if (this.props.currentUser.id) {
            const newPointsInfo = {userId: this.props.currentUser.id, points: 5}
            this.props.updatePoints(newPointsInfo)
        } 
    };

    render() {
        const inputValue = this.state.userNote;
        const actions =
            [
                <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
                <FlatButton label="Submit" primary={true} onClick={this.handleSubmit} disabled={disableSubmit} />
            ];
        let disableSubmit = inputValue.length > 500 || inputValue.length <= 0;
        const notes = this.props.currentExperience.notes
        return (
            <div className="notes-page">
                <div className='add-note-form'>
                    <Dialog
                        title={`Leave a piece of history: `}
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
                                onChange={this.changeNote}

                            />
                        </form>
                    </Dialog>
                </div>
                <div>
                    <Card style={{backgroundColor:teal900}}>
                        <CardHeader title={`${this.props.currentPlace.title}`} titleColor={white}/>
                        <CardMedia> 
                            <img src='/images/notes.jpg' alt="" />
                        </CardMedia>
                        <CardActions>
                            <FlatButton label="Leave Note"
                            primary={true}
                            fullWidth={true}
                            onClick={this.handleOpen}
                            style={{ color:white, backgroundColor:teal500 }}
                            />
                        </CardActions>
                    </Card>
                {
                    notes && notes.map(note => {
                        let date = new Date(note.createdAt).toDateString();
                        let time = new Date(note.createdAt).toLocaleTimeString();
                        let user;
                        this.state.currentUser ? user = this.state.currentUser.userName : user = 'AnonymousMeanderer'
                        return (
                            <div>
                            <Card key={note.id}>
                                <CardHeader subtitle={`${date}, ${time} by ${user}`}/>
                                <CardText> {note.content} </CardText>
                            </Card>
                            </div>
                        )
                    }
                    )
                }
                </div>
                <br /> 
                <Center>
                <NavLink to="/synopsis">
                    <RaisedButton label="BACK" backgroundColor={ teal500 } labelColor={ white } />
                </NavLink>
                </Center>
            </div>
        )


    }
}


const mapState = state => {
    return {
        currentUser: state.user,
        currentExperience: state.experience,
        currentPlace: state.selectedPlace
    }
}

const mapDispatch = dispatch => {
    return {
        addNewNote: function (note, experienceId) {
            dispatch(postNote(note, experienceId))
        },
        updatePoints: (pointsInfo) => {
            dispatch(calculatePoints(pointsInfo))
        }
    }
}

export default connect(mapState, mapDispatch)(Notes)