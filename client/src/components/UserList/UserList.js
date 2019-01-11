import React from "react";

import { Link } from 'react-router-dom';

const UserList = props => {
	return (
		<div>
			{props.users.map(user => (
				<div className="user-container" key={user.id}>
					<Link to={`users/${user.id}`}>{user.name}</Link>
					
					<p>{user.text}</p>
					<br />
				</div>
			))}
		</div>
	);
};

export default UserList;
