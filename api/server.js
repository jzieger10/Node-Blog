const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const userDb = require("../data/helpers/userDb");
const postDb = require("../data/helpers/postDb");
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("short"));

// Custom middleware
function uppercaseName(req, res, next) {
    let name = req.body.name;
    req.body.name = name.toUpperCase();

    next();
}


// =====
// Users
// =====
server.get("/users", (req, res) => {
	userDb
		.get()
		.then(users => {
			res.status(200).json({ users });
		})
		.catch(res.status(500));
});

server.get("/users/:id", (req, res) => {
	const id = req.params.id;
	userDb
		.getUserPosts(id)
		.then(userPosts => {
			res.status(201).json({ userPosts });
		})
		.catch(res.status(500));
});

server.post("/users", uppercaseName, (req, res) => {
    // name = req.body.name;
    // console.log(req.body.name.toUpperCase())
	newUser = req.body;
	userDb
		.insert(newUser)
		.then(users => {
			res.status(201).json({ users });
		})
		.catch(res.status(500));
});

server.put("/users/:id", uppercaseName, (req, res) => {
	const id = req.params.id;
	const changes = req.body;
	userDb
		.update(id, changes)
		.then(count => {
			res.status(201).json({ count });
		})
		.catch(res.status(500));
});

server.delete("/users/:id", (req, res) => {
	const id = req.params.id;
	userDb
		.remove(id)
		.then(count => {
			res.status(200).json({ count });
		})
		.catch(res.status(500));
});


// =====
// Posts
// =====
server.get("/posts", (req, res) => {
	postDb
		.get()
		.then(posts => {
			res.status(200).json({ posts });
		})
		.catch(res.status(500));
});


server.get("/posts/:id", (req, res) => {
	const id = req.params.id;
	postDb
		.get(id)
		.then(post => {
			res.status(201).json({ post });
		})
		.catch(res.status(500));
});

server.post("/posts", (req, res) => {
	newPost = req.body;
	postDb
		.insert(newPost)
		.then(posts => {
			res.status(201).json({ posts });
		})
		.catch(res.status(500));
});

server.put("/posts/:id", (req, res) => {
	const id = req.params.id;
	const changes = req.body;
	postDb
		.update(id, changes)
		.then(count => {
			res.status(201).json({ count });
		})
		.catch(res.status(500));
});

server.delete("/posts/:id", (req, res) => {
	const id = req.params.id;
	postDb
		.remove(id)
		.then(count => {
			res.status(200).json({ count });
		})
		.catch(res.status(500));
});

module.exports = server;
