const express = require("express");

const userDb = require("../../../../data/helpers/userDb.js");

const router = express.Router();

function uppercaseName(req, res, next) {
	let name = req.body.name;
	req.body.name = name.toUpperCase();

	next();
}

router
	.route("/")
	.get((req, res) => {
		userDb
			.get()
			.then(users => {
				res.status(200).json({ users });
			})
			.catch(res.status(500));
	})
	.post(uppercaseName, (req, res) => {
		let newUser = req.body;
		if (newUser.name) {
			userDb
				.insert(newUser)
				.then(user => {
					res.status(201).json({ user });
				})
				.catch(res.status(500));
		} else {
			res.status(400).json({ errorMessage: "Please provide a name" });
		}
	});

router
	.route("/:id")
	.get((req, res) => {
		const id = req.params.id;
		userDb
			.getUserPosts(id)
			.then(userPosts => {
				res.status(201).json({ userPosts });
			})
			.catch(res.status(500));
	})
	.put(uppercaseName, (req, res) => {
		const id = req.params.id;
		const changes = req.body;
		userDb
			.update(id, changes)
			.then(count => {
				res.status(201).json({ count });
			})
			.catch(res.status(500));
	})
	.delete((req, res) => {
		const id = req.params.id;
		userDb
			.remove(id)
			.then(count => {
				res.status(200).json({ count });
			})
			.catch(res.status(500));
	});

module.exports = router;
