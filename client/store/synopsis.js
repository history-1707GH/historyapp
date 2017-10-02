import axios from 'axios'

const GET_SYNOPSIS = 'GET_SYNOPSIS'

const getSynopsis  = synopsis => {
  return {type: GET_SYNOPSIS, synopsis}
}

export const fetchSynopsis = (pageTitle) => {
  return function thunk(dispatch) {
    return axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=parse&page=${pageTitle}&format=json`)
      .then(res=>{
        dispatch(getSynopsis(res.data))
      })
      .catch(err=>console.log("there was an issue", err))
  }
}

export default function (state={}, action){
  switch(action.type) {
    case GET_SYNOPSIS: return action.synopsis
    default: return state
  }
}


// `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&pageids=${pageId}&prop=extracts&redirects=true
//`https://en.wikipedia.org/w/api.php?origin=*&action=parse&page=${pageTitle}`