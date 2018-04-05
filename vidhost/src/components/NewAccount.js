import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
export default class NewAccount extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
    }
    this.handleSetUsername = this.handleSetUsername.bind(this);
    this.handleSetPassword = this.handleSetPassword.bind(this);
    this.createUser = this.createUser.bind(this);
  }
  handleSetUsername(e) {
    this.setState({username: e.target.value});
  }
  handleSetPassword(e) {
    this.setState({password: e.target.value});
  }
  createUser(e) {
    const newUser = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post('http://localhost:5000/user_create', newUser)
      .then(data => {
        const user = { username: this.state.username, password: this.state.password };
        axios.post('http://localhost:5000/find_user', user)
        .then(data => {
          setTimeout(() => {
            window.location = `/my_channel/${this.state.username}`;
          })
        })
        .catch(err => {
          console.log(err);
        });
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    return(
      <div>
        <div className="form-group">
          <h1> Create Your Vidhost Account </h1>
          <label htmlFor="name"> Choose your username:</label>
          <input type="name" className="form-control" id="name" value = { this.state.username } onChange = { this.handleSetUsername }/>
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Create your password:</label>
          <input type="password" className="form-control" id="pwd" value = { this.state.password } onChange = { this.handleSetPassword }/>
        </div>
        <button type="submit" className="btn btn-default" onClick = { this.createUser }>Submit</button>
      </div>
    )
  }
}
