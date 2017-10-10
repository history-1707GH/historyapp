
const GET_SYNOPSIS = 'GET_SYNOPSIS'
const REMOVE_SYNOPSIS = 'REMOVE_SYNOPSIS'

export const getSynopsis  = synopsis => {
  return {type: GET_SYNOPSIS, synopsis}
}

export const removeSynopsis  = () => {
  return {type: REMOVE_SYNOPSIS}
}

export default function (state={}, action){
  switch(action.type) {
    case GET_SYNOPSIS: return action.synopsis
    case REMOVE_SYNOPSIS: return {}
    default: return state
  }
}