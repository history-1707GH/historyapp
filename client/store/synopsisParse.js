
const GET_SYNOPSISPARSE = 'GET_SYNOPSISPARSE'


export const getSynopsisParse  = synopsisParse => {
  return {type: GET_SYNOPSISPARSE, synopsisParse}
}


export default function (state={}, action){
  switch(action.type) {
    case GET_SYNOPSISPARSE:
      return action.synopsisParse
    default: return state
  }
}

