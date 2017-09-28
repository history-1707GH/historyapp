import axios from 'axios';
import {secrets_NYT_API_KEY } from '../../secrets'


// ACTION TYPE
const SET_NEWS_HEADLINES = 'SET_NEWS_HEADLINES';

// ACTION CREATOR
export const setHeadlines = headlines => {
  return {type:SET_NEWS_HEADLINES, headlines}
}

// REDUCER 
export default (headlines=[], action) => {
  switch (action.type){
    // I don't foresee us needing to "ADD" to the headlines so whenever we are fetching headlines i'm assuming we are resetting the Global State for the headlines of the current event/point of interest at a time 
    case SET_NEWS_HEADLINES: return action.headlines;
    default: return headlines;
  }
}

// THUNKS 
export const fetchHeadlines = query => dispatch => {
  const api_key = secrets_NYT_API_KEY;
  const fields = 'snippet,lead_paragraph,abstract,headline,keywords,pub_date,document_type,byline,_id,multimedia'; 
  // using options as a way to optionally construct publication date time frame
  const options = '';

  axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&sort=oldest&fields=${fields}${options}&api-key=${api_key}`)
  .then(res => {
    console.log(res.data.response);
    dispatch(setHeadlines(res.data.response.docs))
  })
  .catch(console.error);
}
 