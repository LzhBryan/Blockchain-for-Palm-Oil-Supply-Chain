const { createHash } = require("crypto")

class Block {
  constructor(prevHash = "", transactions, timestamp) {
    this.prevHash = prevHash
    this.hash = this.computeHash()
    this.transactions = transactions
    this.timestamp = timestamp
  }

  computeHash() {
    return createHash("sha256")
      .update(
        this.prevHash + this.timestamp + JSON.stringify(this.transactions)
      )
      .digest("hex")
  }

  hasValidTransactions() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false
      }

      return true
    }
  }
}

module.exports = Block
