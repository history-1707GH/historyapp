import {getSynopsis} from './synopsis'
import {getSynopsisParse} from './synopsisParse'
import {setHeadlines} from './newsreel'
import {secrets_NYT_API_KEY } from '../../secrets_frontend'
import axios from 'axios'

export const fetchExperienceData = (wikiPageId, wikiPageTitle, headlineQuery) => {
    console.log('params in thunk creator', wikiPageId, wikiPageTitle, headlineQuery)
    return function thunk(dispatch) {
        //fetch and format synopsis, call synopsis action creator
        return axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&pageids=${wikiPageId}&prop=extracts&redirects=true `)
            .then(res => {
                const wikiInfo = res.data.query.pages[wikiPageId]
                let content = wikiInfo.extract
                let index = 0
                let selector = ""
                if (content.includes('<span id="Menus">Menus</span>'))
                    selector = '<span id="Menus">Menus</span>'
                else if (content.includes('<span id="Image_gallery">Image gallery</span>'))
                    selector = '<span id="Image_gallery">Image gallery</span>'
                else if (content.includes('<span id="See_also">See also</span>'))
                    selector = '<span id="See_also">See also</span>'
                else if (content.includes('<span id="References">References</span>'))
                    selector = '<span id="References">References</span>'
                else if (content.includes('<span id="External_links">External links</span>'))
                    selector = '<span id="External_links">External links</span>'

                index = content.indexOf(selector)
                const preparedText = content.slice(0, index);

                return {
                    title: wikiInfo.title,
                    content: preparedText
                }
            })
            .then(synopsis => {
                dispatch(getSynopsis(synopsis))
            })
            //fetch synopsis info, call synopsis info action creator 
            .then(() => {
                const propOptions = "text|categories|links|images|externallinks|sections|displaytitle|iwlinks"
                return axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=parse&prop=${propOptions}&page=${wikiPageTitle}&format=json`)
            })
            .then(res => {
                dispatch(getSynopsisParse(res.data))
            })
            //fetch newsreel articles, call newsreel info action creator
            .then(() => {
                const api_key = secrets_NYT_API_KEY;
                const fields = 'snippet,lead_paragraph,abstract,headline,keywords,pub_date,document_type,byline,_id,multimedia,news_desk,section_name,source,type_of_material,_id';
                // using options as a way to optionally construct publication date time frame
                const options = '';
                return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${headlineQuery}&sort=newest&${fields}${options}&api-key=${api_key}`)
            })
            .then(res => {
                let headlines = res.data.response.docs;
                dispatch(setHeadlines(headlines));
                //save article to the db
                return axios.post('/api/article', headlines)
                    .then(articles => console.log('Successfully saved articles'))
                    .catch(console.error);
            })
            .catch(err => console.log("there was an issue", err))
    }
}