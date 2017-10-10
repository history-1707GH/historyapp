const GET_ROUTE_ID = 'GET_ROUTE_ID'
const DELETE_ROUTE_ID = 'DELETE_ROUTE_ID'

export const getRouteId = routeId => {
    return {type: GET_ROUTE_ID, routeId}
}

export const deleteRouteId = () => {
    return {type: DELETE_ROUTE_ID}
}

export default function(state = 0, action) {
    switch(action.type) {
        case GET_ROUTE_ID: return action.routeId
        case DELETE_ROUTE_ID: return 0
        default: return state
    }
}