"use strict";
let express          = require('express'),
  app                = express(),
  port               = process.env.PORT || 5000,
  urlShortener      = require('./lib/short-url-controller.js');

app.set('view engine', 'pug');

app.get('/new/:url', urlShortener);
app.get('/', function(req, res) {
  res.render('index');
});

let listener = app.listen(port, function () {
  console.log('your app is listening on port ' + listener.address().port);
});
