import axios from 'axios'

const GET_SYNOPSIS = 'GET_SYNOPSIS'

const getSynopsis  = synopsis => {
  return {type: GET_SYNOPSIS, synopsis}
}

export const fetchSynopsis = (location) => {
  return function thunk(dispatch) {
    
    return axios.get(``)
      .then(res=>res.data)
      .then((returnedData)=>console.log(returnedData))
      .catch(err=>console.log("there was an issue", err))
  }
}

export default function (state={}, action){
  switch(action.type) {
    case GET_SYNOPSIS: return action.synopsis
    default: return state
  }
}