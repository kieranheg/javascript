var fs = require('fs');

function readJSON(filename, callback){
  fs.readFile(filename, 'utf8', function (err, res){
    if (err) return callback(err);
    try {
      res = JSON.parse(res);
    } catch (ex) {
      return callback(ex);
    }
    console.log('Calling back...');
    callback(null, res);
  });
}

readJSON('./sample.json', function(err, res) {
	console.log('Read completed, result is ', res);
});