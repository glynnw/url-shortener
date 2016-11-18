"use strict";
let express          = require('express'),
  app                = express(),
  port               = process.env.PORT || 5000,
  urlShortener      = require('./lib/url-shortener.js');

app.set('web engine', 'pug');

app.get('/new/:url', urlShortener);
app.get('/', function(req, res) {
  res.render('index');
});

let listener = app.listen(port, function () {
  console.log('your app is listening on port ' + listener.address().port);
});
