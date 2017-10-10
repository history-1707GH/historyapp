import axios from 'axios'
import { errorUser } from './userError'

//TYPES
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

//CREATORS
export function getUser(user) {
    return {
        type: GET_USER,
        user: user
    }
}

export function removeUser() {
    return {
        type: REMOVE_USER
    }
}

//THUNK
export function newUser(account, history, query) {
    return function thunk(dispatch) {
        return axios.post('/auth/me', account)
            .then(res => {
                if (res.data.signupError) {
                    dispatch(errorUser(res.data))
                } else {
                    dispatch(getUser(res.data))
                    if (query.length) {
                        history.push('/map')
                    } else {
                        history.go(-2)
                    }
                }
            })
            .catch(err => console.error(`Unable to create user`, err))
    }
}

export function logIn(account, history, query) {
    return function thunk(dispatch) {
        return axios.put('/auth/me', account)
            .then(res => {
                if (res.data.loginError) {
                    dispatch(errorUser(res.data))
                } else {
                    dispatch(getUser(res.data))
                    query.length ? history.push('/map') : history.goBack()
                }
            })
            .catch(err => console.error(`Unable to log in user`, err))
    }
}

export function logOut() {
    return function thunk(dispatch) {
        return axios.delete('/auth/me')
            .then(() => {
                dispatch(removeUser())
            })
            .catch(err => console.error(`Unable to log out user`, err))
    }
}

export function fetchUser() {
    return function thunk(dispatch) {
        return axios.get('/auth/me')
            .then(res => {
                dispatch(getUser(res.data))
            })
            .catch(err => console.error(`Unable to get user`, err))
    }
}

//REDUCER
export default function reducer(state = {}, action) {
    switch (action.type) {
        case GET_USER: return action.user || state
        case REMOVE_USER: return {}
        default: return state
    }
}