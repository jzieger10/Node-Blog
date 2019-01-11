import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

import "./App.css";
import PostList from "./components/PostList/PostList";
import Post from './components/Post/Post';
import UserList from "./components/UserList/UserList";
import User from './components/User/User';

const NavBar = styled.nav`
	background-color: #b92f27;
	width: 100%;
	padding: 10px 50px;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
`

const NavLink = styled.a`
	margin: 15px;
	text-decoration: none;
	font-weight: bold;
	font-size: 1.2rem;
	color: #fff;

	&:hover {
		color: darkcyan;
	}
`

const NewUserForm = styled.form`

`

const NewUserInput = styled.input`
	margin: 10px 20px;
`

const NewUserInputButton = styled.button`
	margin: 10px 0;
`

class App extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			posts: [],
			newUser: ''
		};
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/posts/")
			.then(res => {
				console.log("Server Response :", res);
				this.setState({
					posts: res.data.posts,
				});
			})
			.catch(err => {
				console.log("Server Error: ", err);
			});
		axios
			.get("http://localhost:5000/users/")
			.then(res => {
				console.log("Server Response :", res);
				this.setState({
					users: res.data.users,
				});
			})
			.catch(err => {
				console.log("Server Error: ", err);
			});
	}

	deletePost() {
		console.log('delete')
	}

	handleChange = event => {
		console.log(event.target.value)
		this.setState({
			newUser: event.target.value,
		});
	};

	addUser(event) {
		event.preventDefault();
		axios
			.post('http://localhost:5000/users/', this.state.newUser)
			.then(res => {
				console.log("Server Response :", res);
				this.setState({
					users: res.data.users,
				});
			})
			.catch(err => {
				console.log("Server Error: ", err);
			});
	}

	deleteUser(event) {
		console.log('deleteUser')
		axios
			.delete('http://localhost:5000/users/', event.target)
			.then(res => {
				console.log("Server Response :", res);
				this.setState({
					users: res.data.users,
				});
			})
			.catch(err => {
				console.log("Server Error: ", err);
			});
	}

	render() {
		return (
			<div className="App">
				<NavBar>
					<NavLink href="/posts">All Posts</NavLink>
					<NavLink href="/users">User List</NavLink>

					<NewUserForm>
					<NewUserInput placeholder="Add a new user" onSubmit={this.addUser} onChange={this.handleChange}></NewUserInput>
					<NewUserInputButton>Submit</NewUserInputButton>
					</NewUserForm>
				</NavBar>
				<Route
					exact
					path="/posts"
					render={props => (
						<PostList {...props} posts={this.state.posts} deletePost={this.deletePost}/>
					)}
				/>
				<Route
					exact
					path="/posts/:id"
					render={props => (
						<Post {...props} posts={this.state.posts} id={this.props}/>
					)}
				/>
				<Route
					exact
					path="/users"
					render={props => (
						<UserList {...props} users={this.state.users} />
					)}
				/>
				<Route
					exact
					path="/users/:id"
					render={props => (
						<User {...props} users={this.state.users} />
					)}
				/>
			</div>
		);
	}
}

export default App;
