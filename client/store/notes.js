import axios from 'axios';
import {fetchExperience} from './experience'

// ACTION TYPES
// const GET_ALLNOTES = 'GET_ALLNOTES';
const ADD_NOTE = 'ADD_NOTE';

// ACTION CREATORS

export function addNote(note) {
  const action = { type: ADD_NOTE, note};
  return action;
}

// THUNK CREATORS

export function postNote(note, experienceId) {
  return function thunk(dispatch) {
    return axios.post(`/api/note/`, note)
      .then(res => res.data)
      .then(note => {
        dispatch(addNote(note));
        dispatch(fetchExperience(experienceId))
      })
      .catch(err => console.log(err))
  }
}


// reducer
const reducer = function (state = [], action) {
  switch (action.type) {
    case ADD_NOTE:
      return [...state, action.note]
    default:
      return state
  }
};

export default reducer