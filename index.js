const express = require('express');
const shortUrlController = require('./lib/short-url-controller.js');
const stubController = require('./lib/stub-controller.js');
const logger = require('winston');

const port = process.env.PORT || 5000;
const app = express();

app.set('view engine', 'pug');
app.use('/', stubController);
app.use('/new', shortUrlController);

const listener = app.listen(port, () => {
  logger.info(`Your app is listening on port ${listener.address().port}`);
});
