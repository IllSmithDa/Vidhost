import { ADD_COMMENT, REPORT_COMMENT } from '../actions';

export default (comments = [], action) => {
    switch (action.type) {
        case ADD_COMMENT:
            //concats the array with the payload which passes in a comment
            return comments.concat(action.payload);
        case REPORT_COMMENT: 
            const newComments = comments.slice(0);
            newComments[action.payload].complete = !newComments[action.payload].complete 
            return newComments;
        default: 
            return comments;
    }
};