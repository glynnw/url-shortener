"use strict";
let express          = require('express'),
  app                = express(),
  port               = process.env.PORT || 5000,
  shortUrlController = require('./lib/short-url-controller.js'),
  stubController     = require('./lib/stub-controller.js');

app.set('view engine', 'pug');

app.use('/', stubController);
app.use('/new', shortUrlController);

let listener = app.listen(port, function () {
  console.log('your app is listening on port ' + listener.address().port);
});
