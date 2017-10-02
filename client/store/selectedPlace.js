


export const SELECTED_PLACE = 'SELECTED_PLACE'


export const selectedPlace = place => {
  return { type: SELECTED_PLACE, place }
}

export default function (state = {}, action) {
  switch (action.type) {
    
    case SELECTED_PLACE: {
      return Object.assign({}, state, action.place)}
    default: return state
  }
}