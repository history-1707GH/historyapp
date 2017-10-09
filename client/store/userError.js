import axios from 'axios'

export const USER_ERROR = 'USER_ERROR'

export function errorUser(error) {
    return {
        type: USER_ERROR,
        error: error
    }
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case USER_ERROR: return action.error || state
        default: return state
    }
}