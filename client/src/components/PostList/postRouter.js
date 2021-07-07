const express = require("express");

const postDb = require("../../../../data/helpers/postDb.js");

const router = express.Router();

router
	.route("/")
	.get((req, res) => {
		postDb
			.get()
			.then(posts => {
				res.status(200).json({ posts });
			})
			.catch(res.status(500));
	})
	.post((req, res) => {
		let newPost = req.body;
		postDb
			.insert(newPost)
			.then(posts => {
				res.status(201).json({ posts });
			})
			.catch(res.status(500));
	});

router
	.route("/:id")
	.get((req, res) => {
		const id = req.params.id;
		postDb
			.get(id)
			.then(post => {
				res.status(201).json({ post });
			})
			.catch(res.status(500));
	})
	.put((req, res) => {
		const id = req.params.id;
		const changes = req.body;
		postDb
			.update(id, changes)
			.then(count => {
				res.status(201).json({ count });
			})
			.catch(res.status(500));
	})
	.delete((req, res) => {
		const id = req.params.id;
		postDb
			.remove(id)
			.then(count => {
				res.status(200).json({ count });
			})
			.catch(res.status(500));
	});

module.exports = router;
