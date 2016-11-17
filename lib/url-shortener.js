let db = require('./db');

function generateStub(length) {
  let result = ""
  for(let i = 0; i < length; i++) {
    let value = Math.round(Math.random() * 36)
    if (value > 9)
      result += String.fromCharCode(value - 9 + 96);
    else
      result += value
  }
  return result;
}
db.one('select * from urls;').then(function(data) { console.log(data); }).catch(function(error) { console.log(error) });

function shortenUrl(req, res) {
  //let url = req.params.url;
  let nurl = generateStub(5);
  let result = "nada";
  db.oneOrNone('select $1 from urls limit 1;', nurl)
  .then((data) => { result = data; })
  .catch((error) => { result = "Error: " + error; });
  res.send(result);
};

module.exports = shortenUrl;
