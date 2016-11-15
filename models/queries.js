var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:12345@localhost:5432/vechirka_db';
var db = pgp(connectionString);

function getAllNews(req, res, next) {
  db.any('select * from users')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL news'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleNews(req, res, next) {
  var newsID = req.params.id;
  db.one('select * from news where nid = $1', newsID)
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE news'
        });
    })
    .catch(function(err) {
      return next(err);
    });
}

function createNews(req, res, next) {
  db.none('insert into news(uid, status, created, changed)' +
      'values(${uid}, ${status}, ${created}, ${changed})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one news'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateNews(req, res, next) {
  db.none('update news set uid=$1, status=$2, created=$3, changed=$4 where nid=$5',
    [req.body.uid, req.body.status, req.body.created,
      req.body.changed, req.params.id])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated news'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeNews(req, res, next) {
  var newsID = req.params.id;
  db.result('delete from news where nid = $1', newsID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} news`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllNews: getAllNews,
  getSingleNews: getSingleNews,
  createNews: createNews,
  updateNews: updateNews,
  removeNews: removeNews
};
