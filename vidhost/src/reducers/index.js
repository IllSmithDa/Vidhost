import { combineReducers } from 'redux';
import commentReducer from './commentReducer';
import videoReducer from './videoReducer';

const rootReducer = combineReducers({
    comments: commentReducer,
    videos: videoReducer
});

export default rootReducer;