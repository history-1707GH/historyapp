
const GET_SYNOPSISPARSE = 'GET_SYNOPSISPARSE'
const REMOVE_SYNOPSISPARSE = 'REMOVE_SYNOPSISPARSE'


export const getSynopsisParse  = synopsisParse => {
  return {type: GET_SYNOPSISPARSE, synopsisParse}
}

export const removeSynopsisParse  = () => {
  return {type: REMOVE_SYNOPSISPARSE}
}


export default function (state={}, action){
  switch(action.type) {
    case GET_SYNOPSISPARSE:
      return action.synopsisParse
    case REMOVE_SYNOPSISPARSE:
      return {}
    default: return state
  }
}

