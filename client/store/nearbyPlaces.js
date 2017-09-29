import axios from 'axios'

const GET_NEARBY_PLACES = 'GET_NEARBY_PLACES'
const SELECTED_PLACE = 'SELECTED_PLACE'

const getNearbyPlaces = places => {
  return { type: GET_NEARBY_PLACES, places }
}

const selectPlace = place => {
  return { type: SELECTED_PLACE, place }
}

export const fetchNearbyPlaces = (location) => {
  return function thunk(dispatch) {
    const lat = location[0]
    const long = location[1]
    return axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=geosearch&gscoord=${lat}%7C${long}&gsradius=10000`)

      .then(res => res.data.query.geosearch)
      .then(locations => {

        dispatch(getNearbyPlaces(locations))
      })
      .catch(err => console.log("there was an issue", err))
  }
}

export default function (state = [], action) {
  switch (action.type) {
    case GET_NEARBY_PLACES: return action.places
    case SELECTED_PLACE: return action.place
    default: return state
  }
}