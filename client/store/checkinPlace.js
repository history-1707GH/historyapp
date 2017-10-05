
export const CHECKIN_PLACE = 'CHECKIN_PLACE'


export const checkinPlace = place => {
  return { type: CHECKIN_PLACE, place }
}

export default function (state = {}, action) {
  switch (action.type) {
    
    case CHECKIN_PLACE:
      return action.place
    default: return state
  }
}