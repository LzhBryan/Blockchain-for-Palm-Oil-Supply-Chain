const { createHash } = require("crypto")
const EC = require("elliptic").ec
const ec = new EC("secp256k1")

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress
    this.toAddress = toAddress
    this.amount = amount
    this.timestamp = new Date().toLocaleString("en-GB")
  }

  computeHash() {
    return createHash("SHA256")
      .update(this.fromAddress + this.toAddress + this.amount + this.timestamp)
      .digest("hex")
  }

  signTransaction(signingKey) {
    if (signingKey.getPublic("hex") !== this.fromAddress) {
      throw new Error("Private and Public key is not matching!")
    }

    const hashTx = this.computeHash()
    const sign = signingKey.sign(hashTx, "base64")
    this.signature = sign.toDER("hex")
  }

  isValid() {
    if (!this.signature || this.signature.length === 0) {
      throw new Error("No signature in this transaction")
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, "hex")
    return publicKey.verify(this.computeHash(), this.signature)
  }
}

module.exports = Transaction
