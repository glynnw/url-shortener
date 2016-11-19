const db = require('./db');
const express = require('express');
const convertIdToBase62 = require('./base62').convertIdToBase62;
const logger = require('winston');

const router = express.Router();

module.exports = router;
router.get('/:url(*)', (req, res) => {
  const url = req.params.url;
  db.oneOrNone('select * from urls where url = $1 limit 1;', url)
    .then((data) => {
      if (data) {
        return {
          oldurl: data.url,
          newurl: `${req.protocol}://${req.get('HOST')}/${convertIdToBase62(data.id)}`,
        };
      }
      return db.one('insert into urls(url) values($1) returning id;', url)
        .then(result => ({
          oldurl: url,
          newurl: `${req.protocol}://${req.get('HOST')}/${convertIdToBase62(result.id)}`,
        })).catch((error) => {
          logger.error(`Error: ${error}`);
          throw error;
        });
    }).then((data) => {
      res.jsonp(data);
    }).catch((error) => {
      logger.error(`Error: ${error}`);
      res.send(500);
    });
});
