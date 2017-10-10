import axios from 'axios'

const GET_TOP_USERS = 'GET_TOP_USERS'

export function getTopUsers(users) {
    return {
        type: GET_TOP_USERS,
        users: users
    }
}

export function fetchRankings(){
  return function thunk (dispatch){
    return axios.get('/api/rankings')
    .then(res=>dispatch(getTopUsers(res.data)))
    .catch(err=>console.error(err))
  }
}

export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_TOP_USERS: return action.users
        default: return state
    }
}