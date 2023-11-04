// Create web server
// from a given user.  The url /comments/:name should return
// a string of comments separated by newlines, for example:
//   /comments/steve
// might return:
//   node.js is awesome
//   javascript is awesome
//   i love coding
// If a user doesn't exist, it should return a 404 status code.
// Hint: you can get the name from req.params.name
// Hint: you can set the status code with res.status()
// Hint: remember to call next() when you're done or your server will hang!
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var port = 8080;

var comments = {
  'steve': [
    'node.js is awesome',
    'javascript is awesome',
    'i love coding'
  ],
  'bob': [
    'hello',
    'world',
    'i love coding'
  ]
};

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/comments/:name', function(req, res, next) {
  var name = req.params.name;
  var comment = comments[name];
  if (comment) {
    res.send(comment.join('\n'));
  } else {
    res.status(404).send('No such user exists!');
  }
  next();
});

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
