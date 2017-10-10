
// ACTION TYPE
const SET_NEWS_HEADLINES = 'SET_NEWS_HEADLINES';
const REMOVE_NEWS_HEADLINES = 'REMOVE_NEWS_HEADLINES';

// ACTION CREATOR
export const setHeadlines = headlines => {
  return {type:SET_NEWS_HEADLINES, headlines}
}
export const removeHeadlines = headlines => {
  return {type:REMOVE_NEWS_HEADLINES}
}

// REDUCER 
export default (headlines=[], action) => {
  switch (action.type){
    case SET_NEWS_HEADLINES: return action.headlines;
    case REMOVE_NEWS_HEADLINES: return {};
    default: return headlines;
  }
}

