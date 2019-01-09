const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const userDb = require('../data/helpers/userDb');
const postDb = require('../data/helpers/postDb');
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("short"));

// Custom middleware
function uppercaseName(name) {
    return name.toUpperCase();
}

// Users
server.get('/users', (req, res) => {
    userDb.get()
    .then(users => {
        res.status(200).json({users})
    })
    .catch(res.status(500))
})

server.post('/users', (req, res) => {
    newUser = req.body;
    userDb.insert(newUser).then(users => {
        res.status(201).json({users})
    })
})

server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    userDb.update(id, changes).then(count => {
        res.status(201).json({count})
    })
})

server.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    userDb.remove(id).then(count => {
        res.status(200).json({count})
    })
})

// Posts
server.get('/posts', (req, res) => {
    postDb.get()
    .then(posts => {
        res.status(200).json({posts})
    })
    .catch(res.status(500))
})



module.exports = server;