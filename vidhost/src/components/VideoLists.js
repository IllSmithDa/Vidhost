import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVideo } from '../actions';
import { Link } from 'react-router-dom';
import axios from 'axios';
class VideoLists extends Component {
  constructor() {
      super();
      this.state = {
        videoList: [],
      }
  }
    componentDidMount() {
      axios.get('http://localhost:5000/getAllVideos')
        .then(data => {  
          let videoList = []
          for (let i = 0; i < data.data.length; i++) {
              videoList.push(data.data[i])
          }
          this.setState({videoList: videoList})
        })
        .catch(err => {
          console.log(err);
        })
    }
    
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
                              <div>
                                <p className = "HomePage-channelName"> channel: {post.videoUploader}</p> 
                              </div>
                            </div>
                       </div>
                    ); 
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        videos: state.videos
    }
}

export default connect(mapStateToProps, { getVideo })(VideoLists);