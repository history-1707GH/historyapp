import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import headlines from './newsreel';
import archives from './archives';
import synopsis from './synopsis'
import synopsisParse from './synopsisParse'
import nearbyPlaces from './nearbyPlaces'
import nextExperiences from './nextExperiences'
import selectedPlace from './selectedPlace'
import checkinPlace from './checkinPlace'
import currentLocation from './currentLocation'
import checkUsername from './checkUsername'
import user from './user'
import currentExperience from './experience'
import route from './route'

//import stuff here

const reducer = combineReducers({
  headlines,
  archives,
  synopsis,
  synopsisParse,
  nearbyPlaces,
  selectedPlace,
  currentLocation,
  user,
  nextExperiences,
  checkUsername,
  currentExperience,
  route,
  checkinPlace

});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger()
  ))
);

export default store;

export * from './newsreel'
export * from './archives'
export * from './synopsis'
export * from './synopsisParse'
export * from './nearbyPlaces'
export * from './selectedPlace'
export * from './currentLocation'
export * from './checkinPlace'
export * from './user'
export * from './nextExperiences'
export * from './checkUsername'
export * from './experience'
export * from './route'




