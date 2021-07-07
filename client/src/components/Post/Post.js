import React from "react";
import axios from "axios";
// import styled from 'styled-components';



class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			post: {},
		};
	}

	componentDidMount() {
		axios
			.get(`http://localhost:5000/posts/${this.props.match.params.id}`)
			.then(res => {
				console.log("Post > Server Response: ", res);
				this.setState({
					post: res.data.post,
				});
			})
			.catch(err => console.log("Post > Server Error: ", err));
	}

	render() {
		return (
			<div>
				<div className="post-container">
					<br />
					<h3>{this.state.post.postedBy}</h3>

					<p>{this.state.post.text}</p>
					<br />
					<p>Tags: {this.state.post.tags}</p>
					
				</div>

			</div>
		);
	}
}

export default Post;
