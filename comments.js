// Create a web server


// 1. Create a web server
const express = require('express');
const app = express();
const Joi = require('joi');
const cors = require('cors');
const comments = require('./comments');
const port = 3000;

app.use(express.json());
app.use(cors());

// 2. Create a route for GET /comments
app.get('/comments', (req, res) => {
    res.send(comments);
});

// 3. Create a route for POST /comments
app.post('/comments', (req, res) => {
    const { error } = validateComment(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const comment = {
        id: comments.length + 1,
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    };
    comments.push(comment);
    res.send(comment);
});

// 4. Create a route for GET /comments/:id
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
        return;
    }
    res.send(comment);
});

// 5. Create a route for PUT /comments/:id
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
        return;
    }

    const { error } = validateComment(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    comment.name = req.body.name;
    comment.email = req.body.email;
    comment.comment = req.body.comment;
    res.send(comment);
});

// 6. Create a route for DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
        return;
    }

    const index = comments.indexOf(comment);
    comments