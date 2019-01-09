import React, { Component } from "react";
import { Route, Link } from 'react-router-dom';
import axios from "axios";
import "./App.css";
import PostList from "./components/PostList/PostList";

class App extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			posts: [],
		};
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/posts/")
			.then(res => {
				console.log("Server Response :", res);
				this.setState({ posts: res.data.posts });
			})
			.catch(err => {
				console.log("Server Error: ", err);
			});
	}

	render() {
		return (
			<div className="App">
				<div className="post-list">
        <Link to="/posts">Post List</Link>
        {/* <PostList posts={this.state.posts}/> */}
					
				</div>
        <Route exact path="/posts" render={ props => (
          <PostList {...props} posts={this.state.posts} />
        )} />
			</div>
		);
	}
}

export default App;
