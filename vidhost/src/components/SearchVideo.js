import axios from 'axios';
import React, { Component } from 'react';
axios.defaults.withCredentials = true;
class SearchBar extends Component {

	constructor () {
		super();
		this.state = {
			searchItem : ''
		}
		this.handleSearchTerm = this.handleSearchTerm.bind(this);
		this.searchForVideos = this.searchForVideos.bind(this);
	}
	
	handleSearchTerm(event) {
		this.setState({searchItem: event.target.value})
	}
	submitFilter = (event) => {
	  const criterion = this.input.value;
	  this.props.filterPosts(criterion);
	}
	searchForVideos() {
		if (this.state.searchItem !== '') {
			setTimeout(() => {
				window.location = `/video_search/${this.state.searchItem}`;
			})
		}
	}
	render() {
		return (
			<div className="SearchBar">
				<input className="SearchBar-field" type="text" onChange={this.handleSearchTerm} placeholder="Search"></input> 
				<button onClick={this.searchForVideos}>Search</button>
			</div>
		);
	}
};

export default SearchBar;