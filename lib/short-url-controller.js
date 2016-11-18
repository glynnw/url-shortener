"use strict";
let db = require('./db');

function generateStub(length) {
  let result = ""
  for(let i = 0; i < length; i++) {
    let value = Math.round(Math.random() * 35)
    if (value > 9)
      result += String.fromCharCode(value + 87);
    else
      result += value
  }
  return result;
}

function shortenUrl(req, res) {
  let url = req.params.url;
  let nurl = generateStub(5);
  let collision = false;

  while(collision) {
    db.oneOrNone('select exists(select * from urls where nurl = $1 limit 1);', nurl)
    .then(function(data) {
      if (data.exists) {
        nurl = generateStub(5);
        collision = true;
      } else
        collision = false;
    }).catch(function(error) {
      console.log('Error: ' + error);
      res.send(500);
    });
  }

  db.none('insert into urls(url, nurl) values($1, $2);', [url, nurl]);
  res.jsonp({
    "oldurl" : url,
    "newurl" : req.host + '/' + nurl
  });
}

module.exports = shortenUrl;
