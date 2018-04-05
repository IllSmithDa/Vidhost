import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchVideo';
import axios from 'axios';
import '../HomePage.css';

axios.defaults.withCredentials = true;

class HomeTab extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loginUsername: 'Click here to Login',
      userLink: '/login'
    } 
  }
  componentDidMount() {
   // console.log('hello')
    axios.get('http://localhost:5000/get_username')
      .then(data => {
        if(data.data === '') {
          console.log(data.data)
          this.setState({ loginUsername: 'Click here to Login', userLink: '/login'});
        } else {
        this.setState({ loginUsername: data.data, userLink: `/my_channel/${data.data}`});
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    return (
      <div>
        <div className = "HomePage__header">
          <div className = "HomePage__header-title">
            <Link to = "/"><h1> <img src = {require("./Assets/play.png")} alt = "Default profile pic" width = "25px" height= "25px"/>Vidhost</h1> </Link>  
          </div>
          <div className = "HomePage__header-search">
            <SearchBar/>
          </div>
          <Link to = "/new-user">
            <div className = "HomePage_header-un">
              <h1> Click here to create new account </h1>
            </div>
          </Link>
          <Link to = {this.state.userLink}>
            <div className = "HomePage_header-un">
              <h1>{this.state.loginUsername}</h1>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomeTab;