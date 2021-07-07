import React from "react";
import styled from 'styled-components';

const PostListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`

const PostContainer = styled.div`
	border: 2px solid darkgray;
	border-radius: 5px;
	width: 30%;
	margin: 20px;
	background: #fff;
`

const DeleteButton = styled.button`

`

const PostList = props => {
	return (
		<PostListContainer>
			{props.posts.map(post => (
				<PostContainer key={post.id}>
					<br />
					<h3>Post #{post.id}</h3>

					<p>{post.text}</p>
					<br />

					<DeleteButton onClick={props.deletePost}>Delete</DeleteButton>
				</PostContainer>
				
			))}
		</PostListContainer>
	);
};

export default PostList;
