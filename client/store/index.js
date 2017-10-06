import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import headlines from './newsreel';
import synopsis from './synopsis'
import synopsisParse from './synopsisParse'
import nearbyPlaces from './nearbyPlaces'
import nextExperiences from './nextExperiences'
import selectedPlace from './selectedPlace'
import currentLocation from './currentLocation'
import authValidation from './authValidation'
import user from './user'


//import stuff here

const reducer = combineReducers({
  headlines,
  synopsis,
  synopsisParse,
  nearbyPlaces,
  selectedPlace,
  currentLocation,
  user,
  nextExperiences,
  authValidation
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
export * from './synopsis'
export * from './synopsisParse'
export * from './nearbyPlaces'
export * from './selectedPlace'
export * from './currentLocation'
export * from './user'
export * from './nextExperiences'
export * from './experienceData'
export * from './authValidation'


