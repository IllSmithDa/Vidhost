import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import NewAccount from './components/NewAccount';
import LoginMenu from './components/Login';
import Channel from './components/Channel';
import RealVideoPlayer from './components/RealVideoPlayer';
import SearchResult from './components/SearchResult';
import reducers from './reducers';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<Provider store = {createStore(reducers)}>
    <Router>
        <div>
            <Route exact path = "/" component = {App}/> 
            <Route path = '/new-user' component = {NewAccount}/>
            <Route path = '/login' component = {LoginMenu}/>    
            <Route path = '/my_channel/:id' component = {Channel}/> 
            <Route path = '/video_player/:video_id' component = {RealVideoPlayer}/>
            <Route path = '/video_search/:search_term' component = {SearchResult}/>
        </div>
    </Router>
</Provider>, 
document.getElementById('root'));
registerServiceWorker();
