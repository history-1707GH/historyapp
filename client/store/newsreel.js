import axios from 'axios';

// ACTION TYPE
const SET_NEWS_HEADLINES = 'SET_NEWS_HEADLINES';

// ACTION CREATOR
export const setHeadlines = headlines => {type:SET_NEWS_HEADLINES, headlines};

// REDUCER 
export default (headlines=[], action) => {
  console.log('action.type', action.type)
  switch (action.type){
    // I don't foresee us needing to "ADD" to the headlines so whenever we are fetching headlines i'm assuming we are resetting the Global State for the headlines of the current event/point of interest at a time 
    case SET_NEWS_HEADLINES: return action.headlines;
    default: return headlines;
  }
}

// THUNKS 
export const fetchHeadlines = query => dispatch => {
  let fakeQuery = 'New York Stock Exchange Great Depression';
  return Request({
    uri: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
    qs: {
      'api-key':'f91c4a6aa0254f31b9b3b807043fdff0',
      q:`${fakeQuery}`,
      sort:'oldest',
      fl:'snippet, lead_paragraph, abstract, headline, keywords, pub_date, document_type, byline, _id, multimedia'
    },
    json:true
  })
  .then(res => {
    dispatch(fetchHeadlines(res.data))
  })
  .catch(console.error);
}
