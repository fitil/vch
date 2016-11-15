var promise = require('bluebird');
var bcrypt = require('bcryptjs');

var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:12345@localhost:5432/vechirka_db';
var db = pgp(connectionString);

var User = {
    create: function(newUser, callback) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                newUser.password = hash;
                db.none('insert into users(name, username, password, email, created)' +
                    'values(${name}, ${username}, ${password}, ${email}, ${created})',
                    newUser);
            });
        });
    },
    getUserByUsername: function(username, callback) {
        db.one('select * from users where username = $1', username)
            .then(function(user) {
                return callback(null, user);
            })
            .catch(function(err) {
                return callback(null, false, err);
            });
    },
    getUserById: function(uid, callback) {
        db.one('select * from users where uid = $1', uid)
            .then(function(user) {
                return callback(null, user);
            })
            .catch(function(err) {
                return callback(null, false, err);
            });
    },
    setUserByIdAccess: function(uid, callback) {
        var newDate = Date.now();
        db.none('update users set access=$1', newDate);
    },
    comparePassword: function(candidatePassword, hash, callback) {
        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if(err) throw err;
            callback(null, isMatch);
        });
    },
    delete: function() {

    }
};

module.exports = User;