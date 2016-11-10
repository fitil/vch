var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

var ejsLocals = require('ejs-locals');
var pages = require(__dirname + '/controllers/pages');
var tasks = require('./models/queries');

// configuration settings
app.engine('ejs', ejsLocals);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// use middleware

app.use(bodyParser.urlencoded({ extended: false }));

// set view locals
app.use(function (req, res, next) {
  app.locals.route = req.url;
  next();
});

// mount routes
app.get('/', function (req, res) { res.redirect('/home') });
app.get('/home', pages.home);
app.get('/about', pages.about);
app.get('/add/news', pages.newsadd);
app.post('/add', function (req, res) {
  var newsTitle = req.body.newsTitle;
  res.redirect('/add/news');
});

module.exports = app;
