import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
axios.defaults.withCredentials = true;

export default class ListOfVideos extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      videoList: []
    }
  }

  componentDidMount() {
    // grabs the current url
    let getId = window.location.href;
    // grabs username inside current url 
    getId = getId.split("/").pop();
  
    axios.get('http://localhost:5000/get_username')
    .then(data => {
      this.setState({username: data.data})
    })
    .catch(err => {
      console.log(err);
    })
    axios
      .get(`http://localhost:5000/video_list/${getId}`)
      .then(data => {
        let videoList = [];
        for (let i = 0; i < data.data.videoList.length; i++) {
          videoList.push(data.data.videoList[i])
        }
        this.setState({videoList: videoList})
      })
      .catch(err => {
        console.log(err);
      });
  };
  // grab video data and pass it to the next component which is RealVideo Player 
  render() {
    return (
      <div className = "HomePage-container">
        {this.state.videoList.map((post) => {
            return (
              <div key = {post.id} className = "HomePage-key"> 
                <div className = "HomePage-div"> 
                  <Link to = {`/video_player/${post.videoID}`}>
                    <img src = {post.videoThumbnail} alt="thumbnail_photo" width = '200' height = '150'/>
                  </Link>
                  <Link to = '/player' className  = "HomePage-videoName"> {post.videoName} </Link>
                  </div>
              </div>
            );
          })}
      </div>
    );
  }
}