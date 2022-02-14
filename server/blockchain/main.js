const Blockchain = require("./blockchain")
const Transaction = require("./transaction")
const EC = require("elliptic").ec
const ec = new EC("secp256k1")

let blockchain = new Blockchain()

const myKey = ec.keyFromPrivate(
  "d91119bceb6d5a8e0eecfa5136fbb21478159bf912a85581abf521689e4f5853"
)
const myWalletAddress = myKey.getPublic("hex")
console.log(myWalletAddress)

const tx1 = new Transaction(myWalletAddress, "jian xin", 100)
tx1.signTransaction(myKey)
blockchain.addTransaction(tx1)

const tx2 = new Transaction(myWalletAddress, "jian xin", 500)
tx2.signTransaction(myKey)
blockchain.addTransaction(tx2)

blockchain.addPendingTransactions()

console.log(JSON.stringify(blockchain.chain, null, 2))
console.log("blockchain valid or not?" + blockchain.isChainValid())
