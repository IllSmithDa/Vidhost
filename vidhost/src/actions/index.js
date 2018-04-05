export const ADD_COMMENT = 'ADD_COMMENT';
export const REPORT_COMMENT = 'REPORT_COMMENT';
export const GET_VIDEO = 'GET_VIDEO';
export const FIND_VIDEO = 'FIND_VIDEO';

export const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment
    };
}

export const reportComment = (index) => {
    return {
        type: REPORT_COMMENT,
        payload: index
    }
}

export const getVideo  = (videoData) => {
    return {
        type: GET_VIDEO,
        payload: videoData
    }
}
export const findVideo = () => {

    
}