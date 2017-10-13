import axios from 'axios'

export const USER_ERROR = 'USER_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'

export function errorUser(error) {
    return {
        type: USER_ERROR,
        error: error
    }
}

export function clearError() {
    return {
        type: CLEAR_ERROR,
    }
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case USER_ERROR: return action.error || state
        case CLEAR_ERROR: return {}
        default: return state
    }
}