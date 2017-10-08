import axios from 'axios'

export const RESPONSE_MESSAGE = 'RESPONSE_MESSAGE'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

export function responseMessage(message){
    return {
        type: RESPONSE_MESSAGE,
        message: message
    }
}
export function clearMessage(){
    return {
        type: CLEAR_MESSAGE,
    }
}

export function checkUsername(name){
    return function thunk(dispatch){
        return axios.put('/auth/me/checkUsername',name)
        .then(res => res.data)
        .then(data => dispatch(responseMessage(data.userAvailability)))
    }
}

export default function reducer (state = {},action){
    switch (action.type){
        case RESPONSE_MESSAGE: return action.message
        case CLEAR_MESSAGE: return {}
        default: return state
    }
}