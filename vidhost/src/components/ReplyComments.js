import React, {Component} from 'react';
import axios from 'axios';
import './CSS/CommentSection.css'
axios.defaults.withCredentials = true;

export default class ReplyComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReplyClicked: false,
      isRepliesHidden: true,
      replayStatement: '',
      username: this.props.username,
      videoUploader: this.props.videoUploader,
      replies: []
    }
    this.onReplyClick = this.onReplyClick.bind(this);
    this.onReplyCancel = this.onReplyCancel.bind(this);
    this.onRepliesHide = this.onRepliesHide.bind(this);
    this.onRepliesShow = this.onRepliesShow.bind(this);
    this.handleReplyChange = this.handleReplyChange.bind(this);
    this.onReplySubmit = this.onReplySubmit.bind(this);
  }
  componentDidMount() {
    const newReply = ({ videoUploader: this.state.videoUploader, videoID: this.state.videoID, index: this.props.index })
    axios.get('http://localhost:5000/get_username')
    .then(data => {
      this.setState({ username: data.data});
      axios.post('http://localhost:5000/get_replies', newReply)
      .then(data => {
        this.setState({replies: data.data})
      })
      .catch(err => {
        console.log(err);
      });
    })
    .catch(err => {
      console.log(err);
    })
  };
  onReplyClick() {
    this.setState({ isReplyClicked: true });
  }
  onReplyCancel() {
    this.setState({ isReplyClicked: false });
  }
  onRepliesHide() {
    this.setState({ isRepliesHidden: true });
  }
  onRepliesShow() {
    this.setState({ isRepliesHidden: false })
  }
  handleReplyChange(event) {
    this.setState({ replayStatement: event.target.value });
    console.log(this.state.replayStatement);
  }
  onReplySubmit() {
    let videoID = window.location.href;
    // grabs video url inside current url 
    videoID = videoID.split("/").pop();

    const newReply = ({replayStatement: this.state.replayStatement, videoUploader: this.state.videoUploader, 
      username: this.state.username, videoID: videoID, index: this.props.index})
    axios.post('http://localhost:5000/add_reply', newReply)
      .then(data => {
        this.setState({replies: data.data, isReplyClicked: false, isRepliesHidden: false})
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    if ( this.state.isRepliesHidden && !this.state.isReplyClicked) {
      return(
        <div>
          <button onClick={this.onRepliesShow}>Show Replies </button>
          <button onClick={this.onReplyClick}> Reply </button>
        </div>
      )
    }
    if ((!this.state.isRepliesHidden && this.state.isReplyClicked) || 
    (this.state.isRepliesHidden && this.state.isReplyClicked)) {
      return(
        <div>
          <div>
            <div>
              {this.state.replies.map((props) => {
                return(
                  <div>
                      <p text-indent='50px'> {props.username}: {props.comment} </p>
                  </div>
                )
              })}
            </div>
            <textarea placeholder = 'Add reply here' onChange = {this.handleReplyChange}/>
          </div>
          <div>
            <button onClick = {this.onReplyCancel}>Cancel</button>
            <button onClick = {this.onReplySubmit}>Submit</button>
          </div>
        </div>
      )
    } 
    if(!this.state.isReplyClicked && !this.state.isRepliesHidden) {
      return (
        <div>
          <div>
              {this.state.replies.map((props) => {
                return(
                  <div>
                    <p margin = '5px'> {props.username}: {props.comment} </p>
                  </div>
                )
              })}
          </div>
          <button onClick = {this.onRepliesHide}> Hide Replies </button>
          <button onClick = {this.onReplyClick}>Reply</button>
        </div>
      )
    }
  }
}