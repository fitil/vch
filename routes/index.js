var express = require('express');
var router = express.Router();
var files = require('../models/files');

//Get Homepage
router.get('/', ensureAuthenticated, function(req, res) {
    res.render('index');
});

router.post( '/upload', files.fileUpload);

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/users/login');
    };
};

module.exports = router;