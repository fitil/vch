var promise = require('bluebird');
var bcrypt = require('bcryptjs');

var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:12345@localhost:5432/vechirka_db';
var db = pgp(connectionString);

var Menu = {

};

module.exports = Menu;