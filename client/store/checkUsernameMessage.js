import axios from 'axios'

export const USERNAME_ERROR_MESSAGE = 'USERNAME_ERROR_MESSAGE'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

export function usernameErrorMessage(message){
    return {
        type: USERNAME_ERROR_MESSAGE,
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
        .then(data => {
            console.log(data.userAvailability)
            dispatch(usernameErrorMessage(data.userAvailability))
        })
    }
}

export default function reducer (state = '',action){
    switch (action.type){
        case USERNAME_ERROR_MESSAGE: return action.message
        case CLEAR_MESSAGE: return ''
        default: return state
    }
}