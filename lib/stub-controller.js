let db = require('./db.js');

function convertBase62ToId(base62) {
  let chars = base62.split('');
  return chars.reduce(function(sum, char) {
    if (/[0-9]/.test(char))
      return sum += parseInt(char);
    else if (/[a-z]/.test(char))
      return sum += char.charCodeAt(0) - 87;
    else
      return sum += char.charCodeAt(0) - 29;
  }, 0);
}

module.exports = function controller(req, res) {
  db.oneOrNone('select * from urls where id = $1;', convertBase62ToId(req.params.stub))
  .then(function(data) {
    res.redirect(301, 'http://' + data.url);
  })
  .catch(function(error) {
    console.log('Error: ' + error);
    res.sendStatus(404);
  });
};
