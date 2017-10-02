 const GET_CURRENTLOCATION = 'GET_CURRENTLOCATION'


 const getCurrentLocation = location => {
  return { type: GET_CURRENTLOCATION, location }
}

export const fetchCurrentLocation = () => {
    return function thunk(dispatch) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let curLocation = [position.coords.latitude, position.coords.longitude]
                dispatch(getCurrentLocation(curLocation))
            },
            (error) => this.setState({ error: error.message }),
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