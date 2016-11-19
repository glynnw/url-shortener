const db = require('./db.js');
const express = require('express');
const convertBase62ToId = require('./base62').convertBase62ToId;
const logger = require('winston');

const router = express.Router();

module.exports = router;
router.get('/:stub', (req, res) => {
  db.one('select * from urls where id = $1;', convertBase62ToId(req.params.stub))
  .then((data) => {
    if (/^[a-zA-Z]+:/.test(data.url)) {
      res.redirect(301, data.url);
    } else {
      res.redirect(301, `http://${data.url}`);
    }
  })
  .catch((error) => {
    logger.error(`Error: ${error}`);
    res.sendStatus(404);
  });
});

router.get('/', (req, res) => {
  res.render('index');
});
