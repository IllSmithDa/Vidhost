import React, { Component } from 'react';
import '../HomePage.css';
import HomeTab from '../components/HomeTab'
import { Link } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

class App extends Component {
  constructor () {
    super();
    this.state = {
      videoList: []
    }
  }

  componentDidMount() {
    // grabs the current url
    let searchItem = window.location.href;
    // grabs username inside current url 
    searchItem = searchItem.split("/").pop();
    const searchVideo = ({ searchTerm: searchItem })
    axios.post('http://localhost:5000/search_videos', searchVideo)
      .then(data => {
        let videoList = [];
        for (let i = 0; i < data.data.length; i++) {
            videoList.push(data.data[i]);
        }
        this.setState({videoList: videoList});
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <HomeTab/>
        <h2>Search Results</h2>    
        <div className = "HomePage-container">
                {this.state.videoList.map((post) => {
                    return (
                        <div key = {post.id} className = "HomePage-key"> 
                            <div className = "HomePage-div"> 
                              <Link to = {`/video_player/${post.videoID}`}>
                              <img src = {post.videoThumbnail} alt="thumbnail_photo" width = '200' height = '150'/>
                              </Link>
                              <Link to = '/player' className  = "HomePage-videoName"> {post.videoName} </Link>
                              <div>
                                <p className = "HomePage-channelName"> channel: {post.videoUploader}</p> <br/>      
                              </div>
                            </div>
                       </div>
                    ); 
                })}
            </div>
      </div>
    );
  }
}

export default App;