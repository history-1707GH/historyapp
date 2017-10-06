
// ACTION TYPE
const SET_NEWS_HEADLINES = 'SET_NEWS_HEADLINES';

// ACTION CREATOR
export const setHeadlines = headlines => {
  return {type:SET_NEWS_HEADLINES, headlines}
}

// REDUCER 
export default (headlines=[], action) => {
  switch (action.type){
    case SET_NEWS_HEADLINES: return action.headlines;
    default: return headlines;
  }
}

