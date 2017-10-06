
const GET_SYNOPSIS = 'GET_SYNOPSIS'

export const getSynopsis  = synopsis => {
  return {type: GET_SYNOPSIS, synopsis}
}

export default function (state={}, action){
  switch(action.type) {
    case GET_SYNOPSIS: return action.synopsis
    default: return state
  }
}