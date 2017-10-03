import axios from 'axios';
import {secrets_NYT_API_KEY } from '../../secretsFrontEnd'


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

// THUNKS 
export const fetchHeadlines = query => dispatch => {
  const api_key = secrets_NYT_API_KEY;
  const fields = 'snippet,lead_paragraph,abstract,headline,keywords,pub_date,document_type,byline,_id,multimedia,news_desk,section_name,source,type_of_material,_id'; 
  // using options as a way to optionally construct publication date time frame
  const options = '';

  axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&sort=newest&${fields}${options}&api-key=${api_key}`)
  .then(res => {    
    let headlines = res.data.response.docs;
    dispatch(setHeadlines(headlines));
    return axios.post('/api/article', headlines)
    .then(articles => console.log('Successfully saved articles'))
    .catch(console.error);
  })
  .catch(console.error);
}
 