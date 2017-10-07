import axios from 'axios';

// ACTION TYPES
// const GET_ALLNOTES = 'GET_ALLNOTES';
const ADD_NOTE = 'ADD_NOTE';
const GET_USER_NOTES = 'GET_USER_NOTES'
const GET_PLACE_NOTES = 'GET_PLACE_NOTES'

// ACTION CREATORS
export function getUserNotes(user_notes) {
  const action = { type: GET_USER_NOTES, user_notes };
  return action;
}

export function addNote(note) {
  const action = { type: ADD_NOTE, note};
  return action;
}
export function getPlaceNotes(place_notes) {
    const action = { type: GET_PLACE_NOTES, place_notes };
    return action;
  }


// THUNK CREATORS
export function fetchUserNotes(userId) {
  return function thunk(dispatch) {
    return axios.get(`/api/note/`)
      .then(res => res.data)
      .then(notes => {
          const user_notes = notes.filter((note)=>{
              note.userId === userId
          })
        dispatch(getUserNotes(user_notes));
      })
      .catch(err => console.log(err))
  }
}

export function postNote(note) {
  return function thunk(dispatch) {
    return axios.post(`/api/note/`, note)
      .then(res => res.data)
      .then(note => {
        dispatch(addNote(note));
      })
      .catch(err => console.log(err))
  }
}

export function fetchPlaceNotes(experienceId) {
    return function thunk(dispatch) {
      return axios.get(`/api/note/`)
        .then(res => res.data)
        .then(notes => {
            const user_notes = notes.filter((note)=>{
                note.experenceId === experenceId
            })
          dispatch(getPlaceNotes(place_notes));
        })
        .catch(err => console.log(err))
    }
  }

// reducer
const reducer = function (state = [], action) {
  switch (action.type) {
    case GET_USER_NOTES:
      return action.user_notes
    case GET_PLACE_NOTES:
      return action.place_notes
    case ADD_NOTE:
      return [...state, action.note]
    default:
      return state
  }
};

export default reducer