// bank.js
var jsonStream = require('duplex-json-stream')
var fs = require('fs');
var net = require('net')
var sodium = require('sodium-native')

var genesisHash = Buffer.alloc(32).toString('hex')

var transactionsLog = getTransactionsLog();
var bal = getTransactionsBalance(transactionsLog);

var server = net.createServer(function(socket) {
  socket = jsonStream(socket)

  socket.on('data', function(msg) {
    console.log('Bank received:', msg)
    var command = msg.cmd;

    switch (command) {
      case 'balance':
        socket.write({
          cmd: 'balance',
          balance: bal
        })
        break;
      case 'deposit':
        bal += parseInt(msg.amount);
        appendToTransactionLog(msg);
        updateTransactionLog(transactionsLog);
        socket.write({
          cmd: 'balance',
          balance: bal
        });
        break;
      case 'withdraw':
        var wDrawAmt = parseInt(msg.amount);
        if (bal - wDrawAmt >= 0) {
          bal -= wDrawAmt;
          appendToTransactionLog(msg);
          updateTransactionLog(transactionsLog);
          socket.write({
            cmd: 'balance',
            balance: bal
          })
        } else {
          socket.write({
            cmd: 'Withdrawal exceeds funds, balance unchanged',
            balance: bal
          })
        }
        break;
      case 'log':
        transactionsLog.forEach(function(el) {
          socket.write({
            cmd: 'log',
            entry: el
          })
        });
        break;
      default:
        // Unknown command
        break;
    }
  })
})

server.listen(3876)

function appendToTransactionLog(entry) {
  // entry is the messages received by the bank. We wrap it in an extra object
  // as this makes verifying the hashes a lot easier
  var prevHash = transactionsLog.length ? transactionsLog[transactionsLog.length - 1].hash : genesisHash
  transactionsLog.push({
    value: entry,
    hash: hashToHex(prevHash + JSON.stringify(entry))
  })
}

function hashToHex(txn) {
  var transaction = new Buffer(txn)
  var encryptedTransaction = new Buffer(sodium.crypto_generichash_BYTES)

  // encrypted message is stored in cipher.
  sodium.crypto_generichash(encryptedTransaction, transaction)
  return encryptedTransaction;
}

function getTransactionsBalance(transactionsLog) {
  var bal = 0;
  var prevTxnHash = genesisHash;
  transactionsLog.forEach(function(txn) {
    var command = txn.value.cmd;
    var amount = parseInt(txn.value.amount);

    verifyLogEntry(prevTxnHash, txn.hash, txn.value);

    switch (command) {
      case 'deposit':
        bal += amount
        console.log('>>>> inc bal ', bal)
        break

      case 'withdraw':
        bal -= amount;
        console.log('>>>> dec bal ', bal)
        break

      default:
        // Unknown command
        break
    }
    prevTxnHash = txn.hash;
  });
  console.log('>>>> final bal ', bal)
  return bal;
}

function verifyLogEntry(prevTxnHash, curTxnHash, curTxn) {
  var calculatedHash = hashToHex(prevTxnHash + JSON.stringify(curTxn));
  var curHash = new Buffer.from(JSON.stringify(curTxnHash));
  if (curHash.toString('hex') !== curTxnHash.toString('hex')) {
    console.log("*** WARNING TRANSACTION LOG ALTERED ***");
    console.log("Expected current entry to be ", calculatedHash.toString('hex'));
    console.log("but current entry is         ", curHash.toString('hex'));
  }
}

function updateTransactionLog(txns) {
  fs.writeFile('vault-log.txt', JSON.stringify(txns, null, 2), (err) => {
    if (err) {
      console.log(err);
      return;
    };
  });
  console.log('Bank txn log updated');
}

function getTransactionsLog() {
  var data = JSON.parse(fs.readFileSync('vault-log.txt'));
  return data;
}
