"use strict";
let db = require('./db');

function generateBase36Stub(length) {
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

function convertIdToBase62(num) {
  let base = 62;
  let map = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    .split('');

  let value = num;
  let result = [];

  while (value > 0) {
    result.unshift(value % base);
    value = Math.trunc(value / base);
  }

  return result.map(function(item) {
    return map[item];
  });
}

function shortenUrl(req, res) {
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
}

module.exports = shortenUrl;
