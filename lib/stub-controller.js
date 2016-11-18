"use strict";
let db    = require('./db.js'),
  express = require('express'),
  router  = express.Router();

function convertBase62ToId(base62) {
  let chars = base62.split('');
  return chars.reduce(function(sum, char) {
    if (/[0-9]/.test(char))
      return sum += parseInt(char);
    else if (/[a-z]/.test(char))
      return sum += char.charCodeAt(0) - 87;
    else
      return sum += char.charCodeAt(0) - 29;
  }, 0);
}

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
