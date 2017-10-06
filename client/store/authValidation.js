import axios from 'axios'

export const RESPONSE_MESSAGE = 'RESPONSE_MESSAGE'

export function responseMessage(message){
    return {
        type: RESPONSE_MESSAGE,
        message: message
    }
}

export function checkUsername(name){
    return function thunk(dispatch){
        return axios.put('/auth/me/checkUsername',name)
        .then(res => res.data.message)
        .then(message => dispatch(responseMessage(message)))
    }
}

export default function reducer (state = {},action){
    switch (action.type){
        case RESPONSE_MESSAGE: return action.message
        default: return state
    }
}