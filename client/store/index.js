import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import headlines from './newsreel';
import synopsis from './synopsis'
import synopsisParse from './synopsisParse'
import nearbyPlaces from './nearbyPlaces'

import selectedPlace from './selectedPlace'
import currentLocation from './currentLocation'
import user from './user'


//import stuff here

export const reducer = combineReducers({
  headlines,
  synopsis,
  synopsisParse,
  nearbyPlaces,
  selectedPlace,
  currentLocation,
  user
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


