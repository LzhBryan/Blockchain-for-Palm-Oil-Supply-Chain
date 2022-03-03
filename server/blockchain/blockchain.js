const Block = require("./block")

class Blockchain {
  constructor() {
    this.chain = [this.initGenesisBlock()]
    this.pendingTransactions = []
  }

  initGenesisBlock() {
    return new Block("", "")
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  addPendingTransactions() {
    const block = new Block(
      this.getLatestBlock().hash,
      this.pendingTransactions
    )
    block.hash = block.computeHash()
    this.chain.push(block)
    this.pendingTransactions = []
  }

  addTransaction(transaction) {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error("Transaction must include sender and receiver address!!")
    }

    if (!transaction.isValid()) {
      throw new Error("Invalid transactions!")
    }

    this.pendingTransactions.push(transaction)
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const prevBlock = this.chain[i - 1]

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false
      }

      if (currentBlock.prevHash !== prevBlock.hash) {
        return false
      }

      if (!currentBlock.hasValidTransactions()) {
        return false
      }
    }
    return true
  }
}

module.exports = Blockchain
