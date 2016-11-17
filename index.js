"use strict";
let express          = require('express'),
  app                = express(),
  port               = process.env.PORT || 5000,
  urlShortener      = require('./lib/url-shortener.js');

app.get('/new/:url', urlShortener);

let listener = app.listen(port, function () {
  console.log('your app is listening on port ' + listener.address().port);
});
