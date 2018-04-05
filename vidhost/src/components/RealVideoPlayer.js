import React, { Component } from 'react';
import HomeTab from './HomeTab';
import CommentList from './CommentList';
import axios from 'axios';
import { Player, BigPlayButton  } from 'video-react';
import './CSS/videoPlayer.css';
import '../../node_modules/video-react/dist/video-react.css' // import css
axios.defaults.withCredentials = true;

class RealVideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoName: '',
      videoID:'',
      videoUploader:'',
      videoData: '',
      videoComments:'',
      comments: [],
      comment: '',
      username: '',
    }
  //  this.setState({username: this.props.username})
    this.handleTextChange = this.handleTextChange.bind(this);
    this.addComment = this.addComment.bind(this);
  }
  componentDidMount() {
    // grabs the current url
    let getId = window.location.href;
    // grabs username inside current url 
    getId = getId.split("/").pop();
     axios.get('http://localhost:5000/get_username')
     .then(data => {
        this.setState({ username: data.data})
        axios.get(`http://localhost:5000/videoInfo/${getId}`)
          .then(data => {
          this.setState({videoID: getId, videoName: data.data.videoName, 
          videoUploader: data.data.videoUploader
        });
        for (let i = 0; i < data.data.comments.length; i++) {
          let videoObject = {commentUsername: data.data.comments[i].username, comment: data.data.comments[i].comment};
          this.state.comments.push(videoObject);
        }
      })
      .catch(err => {
        console.log(err);
      })
     })
     .catch(err => {
       console.log(err);
     })
  }
  setUserName(userName) {
    this.setState({username: userName});
  }
  handleTextChange(e) {
    let comment = e.target.value;
    this.setState({ comment: comment});
  }
  addComment() {
    let getId = window.location.href;
    // grabs username inside current url 
    getId = getId.split("/").pop();

    const comment = { comment: this.state.comment, username:this.state.username, videoUploader: this.state.videoUploader }
    axios.post(`http://localhost:5000/addComment/${getId}`, comment)
      .then(data => {
        let videoComments = [];
        for (let i = 0; i < data.data.comments.length; i++) {
          let videoObject = {commentUsername: data.data.comments[i].username, comment: data.data.comments[i].comment};
          videoComments.push(videoObject);
        }
        this.setState({ comments: videoComments });
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
      return(
      <div >
          <HomeTab/>
          <h1>{this.state.videoName}</h1>
          <Player
           src={`http://localhost:5000/streamVideo/${this.state.videoID}/${this.state.videoUploader}`}
           className='video-player'
           fluid={false} width={896} height={504}>
            <BigPlayButton position="center" />
           </Player>
           <h2> {this.state.videoUploader} </h2>
           <div>
            <CommentList/>
          </div>
      </div>
      );
  }
}

export default RealVideoPlayer;