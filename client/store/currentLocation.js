 const GET_CURRENTLOCATION = 'GET_CURRENTLOCATION'


 const getCurrentLocation = location => {
  return { type: GET_CURRENTLOCATION, location }
}

// OB/FF: consider another thunk that constantly updates, e.g. `constantlyUpdateCurrentLocation`
// OB/FF: you'll want another thing to dispatch `stopConstantlyUpdating`
export const fetchCurrentLocation = () => {
    return function thunk(dispatch) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let curLocation = [position.coords.latitude, position.coords.longitude]
                dispatch(getCurrentLocation(curLocation))
            },
            (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        )
            
    }
  }

export default function (state = [0, 0], action) {
  switch (action.type) {
    case GET_CURRENTLOCATION: 
      return action.location
    default: return state
  }
}