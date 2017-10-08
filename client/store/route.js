const GET_ROUTE = 'GET_ROUTE'

export const getRoute = route => {
    return {type: GET_ROUTE, route}
}

export default function(state = [], action) {
    switch(action.type) {
        case GET_ROUTE: return action.route
        default: return state
    }
}