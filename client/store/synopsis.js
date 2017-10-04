import axios from 'axios'

const GET_SYNOPSIS = 'GET_SYNOPSIS'

const getSynopsis  = synopsis => {
  return {type: GET_SYNOPSIS, synopsis}
}

export const fetchSynopsis = (pageId) => {
  return function thunk(dispatch) {
    return axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&pageids=${pageId}&prop=extracts&redirects=true `)
      .then(res=>{
        let content = res.data.query.pages[pageId].extract
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
          title: res.data.query.pages[pageId].title,
          content: preparedText
        }
      })
      .then(synopsis=>{
        dispatch(getSynopsis(synopsis))
      })
      .catch(err=>console.log("there was an issue", err))
  }
}

export default function (state={}, action){
  switch(action.type) {
    case GET_SYNOPSIS: return action.synopsis
    default: return state
  }
}