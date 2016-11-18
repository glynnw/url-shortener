let db = require('./db.js');

module.exports = function controller(req, res) {
  let stub = req.params.stub;
  let url = db.oneOrNone('select * from urls where nurl = $1;', stub)
    .then(function(data) {
      console.log(data.url);
      return data.url;
    })
    .catch(function(error) {
      console.log('Error: ' + error);
    });;
  res.redirect(url);
};
