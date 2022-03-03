const { createHash } = require("crypto")

class Block {
  constructor(prevHash = "", transactions) {
    this.prevHash = prevHash
    this.hash = this.computeHash()
    this.transactions = transactions
    this.timestamp = new Date().toLocaleString("en-GB")
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
