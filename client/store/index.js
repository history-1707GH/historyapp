import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import headlines from './newsreel';
import synopsis from './synopsis'
import nearbyPlaces from './nearbyPlaces'
import user from './user'

//import stuff here

const reducer = combineReducers({
  headlines,
  synopsis,
  nearbyPlaces,
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

export * from './newsreel';
export * from './synopsis'
export * from './nearbyPlaces'
export * from './user'


