import { GET_VIDEO } from '../actions'

export default (videos = [], action) => {
    switch(action.type) {
        case GET_VIDEO: 
            //console.log(action.payload);
            return videos.concat(action.payload);
        default: 
            return videos;

    }
}