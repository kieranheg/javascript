// bank.js
var jsonStream = require('duplex-json-stream')
var fs = require('fs');

var net = require('net')
var log = readTextFile();
var bal = getStoredBalance(log);

var server = net.createServer(function (socket) {
  socket = jsonStream(socket)

  socket.on('data', function (msg) {
    console.log('Bank received:', msg)
    var command = msg.cmd;

    switch (command) {

    case 'balance':
      socket.write({cmd: 'balance', balance: bal})
      break;

    case 'deposit':
    	log.push(msg);
      bal += parseInt(msg.amount);
      writeTextFile(log);
      socket.write({cmd: 'balance', balance: bal});
      break;

    case 'withdraw':
    	log.push(msg);
    	var wDrawAmt = parseInt(msg.amount);
    	if (bal - wDrawAmt >= 0) {
    	  bal -= wDrawAmt;
    	  writeTextFile(log);
    	}
      socket.write({cmd: 'balance', balance: bal})
      break;

    case 'log':
    	log.forEach(function(el) {
    		socket.write({cmd: 'log', entry: el})
    	});
      break;

    default:
      // Unknown command
      break;
    }
  })
})

server.listen(3876)

function getStoredBalance(txns) {
	var bal = 0;
	txns.forEach(function(txn) {
		var command = txn.cmd;

		switch (command) {
		  case 'deposit':
		    bal += parseInt(txn.amount);
		    	console.log('>>>> inc bal ', bal)
		    break

		  case 'withdraw':
		    bal -= parseInt(txn.amount);
		    	console.log('>>>> dec bal ', bal)
		    break

		  default:
		    // Unknown command
		    break
		}
	});
	console.log('>>>> final bal ', bal)
	return bal;
}

function writeTextFile(txns) {
	fs.writeFile('vault-log.txt', JSON.stringify(txns, null, 2), (err) => {
		if (err) {
			console.log(err);
			return;
		};
	});
	console.log('Bank txn log updated');
}

function readTextFile() {
	var data = JSON.parse(fs.readFileSync('vault-log.txt'));
	return data;
}
