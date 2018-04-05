import React, {Component} from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default class ListOfVideos extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      videoList: [],
      videoIdDelete: []
    }
    this.deleteVideos = this.deleteVideos.bind(this);
    this.handleDeleteCheck = this.handleDeleteCheck.bind(this);
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
      .get(`http://localhost:5000/video_list/${getId}/${this.state.username}`)
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
  deleteVideos() {
    const videoDelete = this.state.videoIdDelete;
    axios
      .post(`http://localhost:5000/delete_video/${this.state.username}`, videoDelete)
      .then(() => {
        window.location = `/my_channel/${this.state.username}`;
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleDeleteCheck(e) {
    if (e.target.checked) {
      if (this.state.videoIdDelete.length === 0) {
        this.state.videoIdDelete.push(e.target.value);
      } else {
        for (let i = 0; i < this.state.videoIdDelete.length; i++) {
          if (this.state.videoIdDelete[i] === e.target.value) {
            break;
          }
          if(i === this.state.videoIdDelete.length - 1) {
            this.state.videoIdDelete.push(e.target.value);
          }    
        }
      }
    } else {
      for (let i = 0; i < this.state.videoIdDelete.length; i++) {
        if (this.state.videoIdDelete[i] === e.target.value) {
          this.state.videoIdDelete.splice(i, 1);
          break;
        }   
      }
    }
  }
  // grab video data and pass it to the next component which is RealVideo Player 
  render() {
    return (
      <div className = "HomePage-container">
        {this.state.videoList.map((post, index) => {
            return (
              <div key = {post.id} className = "HomePage-key"> 
                <div className = "HomePage-div"> 
                    <img src = {post.videoThumbnail} alt="thumbnail_photo" width = '200' height = '150'/>
                    <p className  = "HomePage-videoName"> {post.videoName} </p>
                  </div>
                  <input type="checkbox" value = { post.videoID } onChange = { this.handleDeleteCheck } />
              </div>
            );
          })}
          <button ype="submit" className="btn btn-default" onClick = { this.deleteVideos }>Delete Video(s)</button>
      </div>
    );
  }
}