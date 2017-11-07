var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

//Create a global array to store all the entries
var entries = [];
//Make this entries array available in all views
app.locals.entries = entries;

//Use Morgan to log every request
app.use(logger('dev'));

//Populates a variable called req.body if the user is submitting a form
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
  res.render('index')
});

app.get('/new-entry', function(req, res){
  res.render('new-entry');
});

app.post('/new-entry', function(req, res){
  //If the user submits the form with no title or content, respond with a 400 error
  if(!req.body.title || !req.body.body){
    res.status(400).send('Entries must have a title and a body');
    return;
  }
  
  entries.push({
    title: req.body.title,
    content: req.body.body,
    published: new Date()
  });
  
  res.redirect('/');
});


app.use(function(req, res){
  res.status(404).render('404');
});

//app.listen(3000, function(){
//  console.log("Server Listening on port 3000...");
//});

module.exports = app;

