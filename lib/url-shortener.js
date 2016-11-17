"use strict";
let db = require('./db');

function generateStub(length) {
  let result = ""
  for(let i = 0; i < length; i++) {
    let value = Math.round(Math.random() * 36)
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
  console.log(nurl);
  db.oneOrNone('select * from urls where nurl = $1 limit 1;', nurl)
  .then(function(data) {
    if (data == null) {
      db.none('insert into urls(url, nurl) values($1, $2);', [url, nurl]);
      res.send(`Site ${url} added as ${process.env.SITE}/${nurl}`);
    }
  })
  .catch(function(error) {
    res.send("Error: " + error);
  });
}

module.exports = shortenUrl;
