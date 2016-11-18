let db = require('./db.js');

module.exports = function controller(req, res) {
  console.log(req.params);

  db.oneOrNone('select * from urls where nurl = $1;', req.params.stub)
  .then(function(data) {
    res.redirect(301, 'http://' + data.url);
  })
  .catch(function(error) {
    console.log('Error: ' + error);
    res.sendStatus(404);
  });
};
