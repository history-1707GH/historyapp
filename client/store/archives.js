import axios from 'axios'
import { NYT_API_KEY } from '../../frontend_keys'

// ACTION TYPE
const SET_NEWS_ARCHIVES = 'SET_NEWS_ARCHIVES';
const REMOVE_NEWS_ARCHIVES = 'REMOVE_NEWS_ARCHIVES';

// ACTION CREATOR
export const setArchives = archives => {
  return {type:SET_NEWS_ARCHIVES, archives}
}
export const removeArchives = () => {
  return {type:REMOVE_NEWS_ARCHIVES}
}

// REDUCER 
export default (archives=[], action) => {
  switch (action.type){
    case SET_NEWS_ARCHIVES: return action.archives;
    case REMOVE_NEWS_ARCHIVES: return [];
    default: return archives;
  }
}

export const fetchArchiveData = archiveQuery => dispatch => {
  const fields = 'snippet,abstract,headline,keywords,pub_date,byline,_id,news_desk,source,web_url,subject';
  return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=${archiveQuery}&sort=oldest&fl=${fields}&api-key=${NYT_API_KEY}`)
  .then(res => {
    let archives = res.data.response.docs
    dispatch(setArchives(archives))
    res.sendStatus(201);
  })
  .catch(err => console.log("there was an issue", err))
}


