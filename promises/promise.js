var fs = require('fs');

function readFile(filename){
  return new Promise(function (resolve, reject){
    fs.readFile(filename, 'utf8').then(function (res){
      try {
        fulfill(JSON.parse(res));
      } catch (ex) {
        reject(ex);
      }
    }, reject);
  });
}
