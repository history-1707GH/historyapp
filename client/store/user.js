import axios from 'axios'

//TYPES
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

//CREATORS
export function getUser(user){
    return {
        type: GET_USER,
        user: user
    }
}

export function removeUser(){
    return {
        type: REMOVE_USER
    }
}

//THUNK
export function newUser(account, history){
    return  function thunk(dispatch){
        return axios.post('/auth/me', account)
        .then(res => {
            dispatch(getUser(res.data))
            //history.push to profile or not
        })
    }
}

export function logIn(account, history){
    return function thunk(dispatch){
        return axios.put('/auth/me', account)
        .then(res=>{
            dispatch(getUser(res.data))
            //history.push to profile or not
        })
    }
}

export function logOut(){
    return function thunk(dispatch){
        return axios.delete('/auth/me')
        .then(res => {
            dispatch(removeUser())
            //history.push to profile or not
        })
    }
}

export function fetchUser(){
    return function thunk(dispatch){
        return axios.get('/auth/me')
        .then(res => {
            dispatch(getUser(res.data))
        })
    }
}

//REDUCER
export default function reducer (state = {},action){
    switch (action.type){
        case GET_USER: return action.user || state
        case REMOVE_USER: return {}
        default: return state
    }
}