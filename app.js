var exphbs = require('express-handlebars');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./models/queries');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var flash = require('connect-flash');

var pages = require('./controllers/pages');
var routes = require('./routes/index');
var users = require('./routes/users');

// Init app
var app = express();

// Upload Init

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

// Set View Locals
app.use(function (req, res, next) {
  app.locals.route = req.url;
  next();
});

// Public Directory
app.use(express.static(path.join(__dirname, 'public')));

// Use Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Connect Flash
app.use(flash());

// Globals Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// mount routes
app.use('/', routes);
app.use('/users', users);
//app.get('/', function (req, res) { res.redirect('/home') });
//app.get('/home', pages.home);
//app.get('/about', pages.about);
//app.get('/add/news', pages.newsadd);
//app.post('/add', function (req, res) {
//   var newsTitle = req.body.newsTitle;
//   res.redirect('/add/news');
// });
app.get('/api/news', db.getAllNews);
// app.get('/api/news/:id', db.getSingleNews);
// app.post('/api/news', db.createNews);
// app.put('/api/news/:id', db.updateNews);
// app.delete('/api/news/:id', db.removeNews);

// Set port
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function () {
    console.log('Listening on port '+app.get('port'));
});

