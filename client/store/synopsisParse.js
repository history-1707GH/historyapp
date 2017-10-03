import axios from 'axios'

const GET_SYNOPSISPARSE = 'GET_SYNOPSISPARSE'


const getSynopsisParse  = synopsisParse => {
  return {type: GET_SYNOPSISPARSE, synopsisParse}
}



export const fetchSynopsisParse = (pageTitle) => {
  return function thunk(dispatch) {
    return axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=parse&page=${pageTitle}&format=json`)
      .then(res=>{
        console.log('res.data', res.data)
        dispatch(getSynopsisParse(res.data))
      })
      .catch(err=>console.log("there was an issue", err))
  }
}



export default function (state={}, action){
  switch(action.type) {
    case GET_SYNOPSISPARSE:
      return action.synopsisParse
    
    default: return state
  }
}

