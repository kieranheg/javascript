var sodium = require('sodium-native')

var message = new Buffer('Hello, World!')
var cipher = new Buffer(sodium.crypto_generichash_BYTES)

// encrypted message is stored in cipher.
sodium.crypto_generichash(cipher, message)

console.log('Encrypted message:', cipher.toString('hex'))
