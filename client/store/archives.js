
// ACTION TYPE
const SET_NEWS_ARCHIVES = 'SET_NEWS_ARCHIVES';

// ACTION CREATOR
export const setArchives = archives => {
  return {type:SET_NEWS_archives, archives}
}

// REDUCER 
export default (archives=[], action) => {
  switch (action.type){
    case SET_NEWS_ARCHIVES: return action.archives;
    default: return archives;
  }
}

