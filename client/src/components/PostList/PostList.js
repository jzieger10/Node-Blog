import React from "react";
import axios from "axios";

const PostList = props => {
	return (
		<div>
			{props.posts.map(post => (
				<div className="post-container" key={post.id}>
					<br />
					<h3>Post #{post.id}</h3>

					<p>{post.text}</p>
					<br />
				</div>
			))}
		</div>
	);
};

export default PostList;
