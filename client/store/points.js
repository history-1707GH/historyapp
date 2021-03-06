import axios from 'axios'
import { getUser } from './user'


export function calculatePoints(pointCalculationObj){
  return function thunk (dispatch){
    axios.put('/api/points', pointCalculationObj)
    .then(res=>dispatch(getUser(res.data)))
  }
}