import {getSynopsis} from './synopsis'
import {getSynopsisParse} from './synopsisParse'
import { setHeadlines, setArchives } from './'
import { NYT_API_KEY } from '../../frontend_keys'
import axios from 'axios'
import {getRoute} from './route'

const GET_CURRENT_EXPERIENCE = 'GET_CURRENT_EXPERIENCE'

const getCurrentExperience = experience => {
    return {type: GET_CURRENT_EXPERIENCE, experience}
}

export default function (state = {}, action) {
    switch(action.type) {
        case GET_CURRENT_EXPERIENCE: return action.experience
        default: return state
    }
}


export const gettingExperience = experience => {
    return function thunk(dispatch) {
        return axios.post('/api/experience', experience)
            .then(res=> {
                const experience = res.data
                dispatch(getCurrentExperience(experience))
                return axios.post('/api/route', experience)
            })
            .then(res=>{
                const route = res.data
                dispatch(getRoute(route))
            })
            .catch(err=>console.log('There was an error in saving the route or experience', err))
    }
}

export const fetchExperienceData = (wikiPageId, wikiPageTitle, headlineQuery) => {
    return function thunk(dispatch) {
        //fetch and format synopsis, call synopsis action creator
        return axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&pageids=${wikiPageId}&prop=extracts&redirects=true`)
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
                    pageId: wikiPageId,
                    title: wikiInfo.title,
                    content: preparedText
                }
            })
            .then(synopsis => {
                dispatch(getSynopsis(synopsis))
                return axios.post('api/synopsis', synopsis)
                    .then(synposis=>{
                        console.log('succesfully saved synopsis')
                    })
                    .catch(err=>console.log('there was an issue', err))
            })
            //fetch synopsis info, call synopsis info action creator 
            .then(() => {
                const propOptions = "text|links|displaytitle"
                return axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=parse&prop=${propOptions}&page=${wikiPageTitle}&format=json`)
            })
            .then(res => {
                dispatch(getSynopsisParse(res.data))
            })
            //fetch newsreel articles, call newsreel info action creator
            .then(() => {
                // NEWS REEL CALL
                const fields = 'snippet,lead_paragraph,abstract,headline,keywords,pub_date,document_type,byline,_id,multimedia,news_desk,section_name,source,type_of_material,web_url';
                // using options as a way to optionally construct publication date time frame
                return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=${headlineQuery}&fl=${fields}&api-key=${NYT_API_KEY}`)
            })
            .then(res => {
                let headlines = res.data.response.docs;
                dispatch(setHeadlines(headlines));
                return axios.post('/api/article', headlines)
                    .then(articles => console.log('Successfully saved articles'))
            })
            .catch(err => console.log("there was an issue", err))
    }
}


