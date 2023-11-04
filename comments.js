// Create a web server for comments
// 
// 1. load express
const express = require('express');
// 2. create an instance of express
const app = express();
// 3. load the comments.json file
const comments = require('./comments.json');
// 4. load body-parser
const bodyParser = require('body-parser');
// 5. load cors
const cors = require('cors');

// 6. use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
// 7. use cors
app.use(cors());

// 8. create a route for get all comments
app.get('/comments', (req, res) => { 
    res.json(comments);
});

// 9. create a route for get a single comment
app.get('/comments/:id', (req, res) => {
    // 10. find the comment by id
    const comment = comments.find(comment => comment.id === req.params.id);
    // 11. return the comment
    res.json(comment);
});

// 12. create a route for post a comment
app.post('/comments', (req, res) => {
    // 13. create a new comment
    const comment = {
        id: Date.now().toString(),
        name: req.body.name,
        comment: req.body.comment
    };
    // 14. push the new comment to the comments array
    comments.push(comment);
    // 15. return the new comment
    res.json(comment);
});

// 16. create a route for update a comment
app.put('/comments/:id', (req, res) => {
    // 17. find the comment by id
    const comment = comments.find(comment => comment.id === req.params.id);
    // 18. update the comment
    comment.name = req.body.name;
    comment.comment = req.body.comment;
    // 19. return the updated comment
    res.json(comment);
});

// 20. create a route for delete a comment
app.delete('/comments/:id', (req, res) => {
    // 21. find the comment by id
    const commentIndex = comments.findIndex(comment => comment.id === req.params.id);
    // 22. delete the comment
    comments.splice(commentIndex, 1);
    // 23. return the deleted comment
    res.json({ message: 'Comment deleted' });
});

// 24. run the server
app.listen(5000, () => console.log('Server running on port 5000'));
