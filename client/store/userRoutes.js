import axios from 'axios'
const GET_ALL_ROUTES= 'GET_ALL_ROUTES'

const getAllRoutes = (routes) => {
    return {type: GET_ALL_ROUTES, routes}
}

export const fetchAllRoutes = (userId) => {
    return function thunk (dispatch) {
        return axios.get(`api/route/${userId}`)
            .then(res => {
                dispatch(getAllRoutes(res.data))
            })
            .catch(err=>console.log('There was an issue getting all routes', err))
    }
}

export default function(state = [], action) {
    switch(action.type) {
        case GET_ALL_ROUTES: return action.routes
        default: return state
    }
}