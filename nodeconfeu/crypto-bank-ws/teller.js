// teller.js
var jsonStream = require('duplex-json-stream')
var net = require('net')

var client = jsonStream(net.connect(3876))

client.on('data', function(msg) {
  console.log('Teller received:', msg)
})

// client.end can be used to send a request and close the socket
var command = process.argv[2];

switch (command) {
  case 'balance':
    client.end({
      cmd: 'balance'
    })
    break

  case 'deposit':
    client.end({
      cmd: 'deposit',
      amount: process.argv[3]
    })
    break

  case 'withdraw':
    client.end({
      cmd: 'withdraw',
      amount: process.argv[3]
    })
    break

  case 'log':
    client.end({
      cmd: 'log'
    })
    break

  default:
    // Unknown command
    break
}
