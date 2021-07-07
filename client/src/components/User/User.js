import React from "react";
import axios from "axios";
import styled from 'styled-components'

const MainUserContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: 0 auto;
`

const MainUserHeader = styled.h1`
	width: 100%;
`

const UserPostContainer = styled.div`
	border: 2px solid darkgray;
	border-radius: 5px;
	background: #fff;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	margin: 20px 10px;
	padding: 10px;
	width: 250px;
`

const PostHeader = styled.h3`
	width: 100%;
	align-self: flex-start;
`

const PostNumber = styled.p`
	width: 100%;
	align-self: flex-end;
	color: #777;
	font-weight: bold;
`

class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userPosts: [],
			id: this.props.match.params.id
		};
	}

	componentDidMount() {
		axios
			.get(`http://localhost:5000/users/${this.props.match.params.id}`)
			.then(res => {
				console.log("User > Server Response: ", res.data);
				this.setState({
					userPosts: res.data.userPosts,
				});
			})
			.catch(err => console.log("User > Server Error: ", err));
	}

	deleteUser(event) {
		console.log(this.state.id)
		console.log('deleteUser')
		// axios
		// 	.delete('http://localhost:5000/users/', this.props.match.params.id)
		// 	.then(res => {
		// 		console.log("Server Response :", res);
		// 		this.setState({
		// 			users: res.data.users,
		// 		});
		// 	})
		// 	.catch(err => {
		// 		console.log("Server Error: ", err);
		// 	});
	}

	render() {
		return (
			<MainUserContainer>
				<MainUserHeader>User {this.props.match.params.id} {/*<span onClick={this.deleteUser}> X</span>*/}</MainUserHeader>
				{this.state.userPosts.map(post => (
					<UserPostContainer key={post.id}>
						<PostHeader>{post.postedBy}</PostHeader>
						<p>{post.text}</p>
						<br />
						<PostNumber>{post.id}</PostNumber>
						<br />
					</UserPostContainer>
				))}
			</MainUserContainer>
		);
	}
}

export default User;
