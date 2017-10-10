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
import currentLocation from './currentLocation'
import checkUsernameMessage from './checkUsernameMessage'
import user from './user'
import userError from './userError'
import currentExperience from './experience'
import experience from './experience'
import routeId from './routeId'
import currentRoute from './currentRoute'
import userRoutes from './userRoutes'
import notes from './notes'
import userRankings from './userRankings'

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
  userError,
  nextExperiences,
  checkUsernameMessage,
  currentExperience,
  experience,
  routeId,
  currentRoute,
  userRoutes,
  notes,
  userRankings,
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
export * from './user'
export * from './userError'
export * from './nextExperiences'
export * from './checkUsernameMessage'
export * from './experience'
export * from './routeId'
export * from './currentRoute'
export * from './userRoutes'
export * from './notes'
export * from './userRankings'




