import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { postNote, fetchPlaceNotes, fetchExperience } from '../store'
import { Card, CardHeader, CardText } from 'material-ui/Card'


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
                            title={`Write a Note for `}
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

                                <br />
                            </form>
                        </Dialog>

                        <br />
                    </div>
                }
                {
                    notes && notes.map(note => {
                        const dateTimeArr = note.createdAt.split('T')
                        const dateArr = dateTimeArr[0].split("-")
                        const date = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
                        const timeArr = dateTimeArr[1].split(':')
                        const hours = timeArr[0]<=12 ? timeArr[0] : timeArr[0]-12
                        const minutes = timeArr[1]
                        const time = `${hours}:${minutes}`
                        return (
                            <Card key={note.id}>
                                <CardHeader title={`${date}, ${time}`}
                                />
                                <CardText> {note.content} </CardText>
                            </Card>
                        )
                    }
                    )
                }

            </div>
        )


    }
}


const mapState = state => {
    return {
        currentUser: state.user,
        currentExperience: state.experience
    }
}

const mapDispatch = dispatch => {
    return {
        addNewNote: function (note, experienceId) {
            dispatch(postNote(note, experienceId))
        }
    }
}

export default connect(mapState, mapDispatch)(Notes)