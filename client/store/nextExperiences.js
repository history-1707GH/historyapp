const GET_NEXT_EXPERIENCES = 'GET_NEXT_EXPERIENCES'

export const getNextExperiences = nextExperiences => {
    return {type: GET_NEXT_EXPERIENCES, nextExperiences}
}

export default function (state=[], action){
    switch(action.type){
        case GET_NEXT_EXPERIENCES: return action.nextExperiences
        default: return state
    }
}