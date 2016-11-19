"use strict";
let db      = require('./db');
let express = require('express');
let router  = express.Router();
let convertIdToBase62 = require('./base62').convertIdToBase62;


router.get('/:url(*)', function(req, res) {
  let url = req.params.url;
  db.oneOrNone('select * from urls where url = $1 limit 1;', url)
  .then(function(data) {
    if (data) {
      return {
        "oldurl" : data.url,
        "newurl" : req.protocol + '://' + req.get('HOST') + '/' + convertIdToBase62(data.id)
      };
    } else {
      return db.one('insert into urls(url) values($1) returning id;', url)
      .then(function(data) {
        return {
          "oldurl" : url,
          "newurl" : req.protocol + '://' + req.get('HOST') + '/' + convertIdToBase62(data.id)
        };
      }).catch(function(error) {
        console.log('Error: ' + error);
        throw error;
      });
    }
  }).then(function(data) {
    res.jsonp(data);
  }).catch(function(error) {
    console.log('Error: ' + error);
    res.send(500);
  });
});

module.exports = router;
