"use strict";
let express          = require('express'),
  app                = express(),
  port               = process.env.PORT || 5000,
  shortUrlController = require('./lib/short-url-controller.js'),
  stubController     = require('./lib/stub-controller.js');

app.set('view engine', 'pug');

app.get('/:stub', stubController);
app.get('/new/:url', shortUrlController);
app.get('/', function(req, res) {
  res.render('index');
});

let listener = app.listen(port, function () {
  console.log('your app is listening on port ' + listener.address().port);
});
