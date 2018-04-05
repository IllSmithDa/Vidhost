import React, {Component} from 'react';
import axios from 'axios';
import ReplyComments from './ReplyComments';
axios.defaults.withCredentials = true;
export default class CommentLIst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      comments: [],
      comment: '',
      videoID: '',
      videoUploader: ''
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.addComment = this.addComment.bind(this);
    this.onReplyClick = this.onReplyClick.bind(this);
  }
  componentDidMount() {
    // grabs the current url
    let getId = window.location.href;
    // grabs videoID inside current url 
    getId = getId.split("/").pop();
    axios.get('http://localhost:5000/get_username')
      .then(data => {
        this.setState({ username: data.data});
      })
      .catch(err => {
        console.log(err);
      })
    axios.get(`http://localhost:5000/videoInfo/${getId}`)
      .then(data => {
         for (let i = 0; i <data.data.comments.length; i++) {
          this.state.comments.push(data.data.comments[i]);
         }
         this.setState({ videoUploader: data.data.videoUploader});
      })
      .catch(err => {
        console.log(err);
      })
  };
  addComment() {
    let getId = window.location.href;
    // grabs video url inside current url 
    getId = getId.split("/").pop();
    const comments = { comment: this.state.comment, username: this.state.username, videoUploader: this.state.videoUploader}
    axios.post(`http://localhost:5000/addComment/${getId}`, comments)
      .then(data => {
        let videoComments = [];
        for (let i = 0; i < data.data.length; i++){
          videoComments.push(data.data[i]);
        }
        this.setState({ comments: videoComments });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleTextChange(e) {
    let comment = e.target.value;
    this.setState({ comment: comment});
    console.log(this.state.comment)
  }
  onReplyClick() {
    this.setState({ replyHidden: false })
  }

  render() {
    return(
      <div>
        <textarea onChange = {this.handleTextChange} placeholder = "Add comment here"></textarea>
        <button onClick={this.addComment}>submit</button>
        {this.state.comments.map((post, index)=> {
          return(
            <div>
              <p>{post.username}: {post.comment} </p>
              <ReplyComments username = {this.state.username} videoUploader = {this.state.videoUploader} index = {index}/>
            </div>
          )
        })}
      </div>
    );
  }
}