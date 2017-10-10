const GET_CURRENT_ROUTE= 'GET_CURRENT_ROUTE'
const DELETE_CURRENT_ROUTE = 'DELETE_CURRENT_ROUTE'

export const getCurrentRoute = experience => {
    return {type: GET_CURRENT_ROUTE, experience}
}

export const deleteCurrentRoute = () => {
    return {type: DELETE_CURRENT_ROUTE}
}

export default function(state = [{},{},{},{},{}], action) {
    switch(action.type) {
        case GET_CURRENT_ROUTE: {
            const nextIdx = state.findIndex(element=>!element.id)
            const newState = [...state]
            newState[nextIdx] = action.experience
            return newState
        }
        case DELETE_CURRENT_ROUTE: {
            return [{},{},{},{},{}]
        }
        default: return state
    }
}