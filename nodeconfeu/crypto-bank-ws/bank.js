// bank.js
var jsonStream = require('duplex-json-stream')
var net = require('net')
var bal = 0;
var log = [];

var server = net.createServer(function (socket) {
  socket = jsonStream(socket)

  socket.on('data', function (msg) {
    console.log('Bank received:', msg)
    var command = msg.cmd;
    switch (command) {
    case 'balance':
    socket.write({cmd: 'balance', balance: bal})
    break

  case 'deposit':
  	log.push(msg);
    bal += parseInt(msg.amount);
    socket.write({cmd: 'deposit', balance: bal})
    break

  case 'log':
  	log.forEach(function(el) {
  		socket.write({cmd: 'log', entry: el})
  	});
    break  

  default:
    // Unknown command
    break
    }

    // socket.write can be used to send a reply
    // s

  })
})

server.listen(3876)