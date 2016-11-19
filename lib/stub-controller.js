"use strict";
let db                = require('./db.js');
let express           = require('express');
let router            = express.Router();
let convertBase62ToId = require('./base62').convertBase62ToId;

router.get('/:stub', function(req, res) {
  db.one('select * from urls where id = $1;', convertBase62ToId(req.params.stub))
  .then(function(data) {
    let url = data.url;
    if (/^[a-zA-Z]+:/.test(url))
      res.redirect(301, url);
    else
      res.redirect(301, 'http://' + url);
  })
  .catch(function(error) {
    console.log('Error: ' + error);
    res.sendStatus(404);
  });
});

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
