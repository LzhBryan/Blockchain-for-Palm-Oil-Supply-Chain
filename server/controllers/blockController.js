const BlockModel = require("../models/block")
const Blockchain = require("../blockchain/blockchain")
const TransactionModel = require("../models/transaction")
const UserModel = require("../models/user")
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors")
const CONSENSUS_THRESHOLD = 0.66
const { createHash } = require("crypto")

const getAllBlocks = async (req, res) => {}

const getBlock = async (req, res) => {}

const createBlock = async (req, res) => {
  const { transactionID } = req.body

  // check if transaction is already in packaging or inBlock status

  const transaction = await TransactionModel.updateMany(
    { _id: transactionID },
    { status: "Packaging" }
  )

  // fetch blockchain latest block to obtain previous hash
  // let blocks = await BlockModel.find({ status: "Approved" })

  // // create genesis block if no blocks could be found
  // if (!blocks) {
  //   const blockChain = new Blockchain()
  //   blockChain.chain[0].blockId = 0
  //   blockChain.chain[0].status = "inChain"
  //   blocks = await BlockModel.create(blockChain.chain[0])
  // }

  const initialBlock = await BlockModel.create({
    timestamp: new Date().toLocaleString("en-GB"),
    transactions: transactionID,
    status: "Pending",
  })
  res.status(201).json({ transaction, initialBlock })

  // create new block object to pass in previous hash and waiting transactions
}

const approveBlock = async (req, res) => {
  const { id: blockID } = req.params
  const { isApproved } = req.body
  const { username, role } = req.user

  if (role !== "Validator") {
    throw new UnauthenticatedError("Not authorized")
  }

  const approveBefore = await BlockModel.findOne({
    $and: [
      { _id: blockID },
      { $or: [{ approvedBy: username }, { rejectedBy: username }] },
    ],
  })

  if (approveBefore) {
    throw new BadRequestError("Already rejected or approved this block")
  }

  let block = await BlockModel.findOneAndUpdate(
    { _id: blockID },
    {
      $addToSet: isApproved
        ? { approvedBy: username }
        : { rejectedBy: username },
    },
    { new: true }
  )

  if (!block) {
    throw new NotFoundError(`No block with id ${blockID}`)
  }

  if (block.status === "Pending") {
    console.log("Doing consensus...")
    const validators = await UserModel.find({ role: "Validator" })

    const approvedPercentage =
      block.approvedBy.length / parseFloat(validators.length)

    if (approvedPercentage >= CONSENSUS_THRESHOLD) {
      block = await BlockModel.findOneAndUpdate(
        { _id: blockID },
        { status: "Approved" },
        { new: true }
      )

      let blockchain = await BlockModel.find({ status: "inChain" }).sort(
        "blockId"
      )

      if (blockchain.length === 0) {
        blockchain = await BlockModel.create(createGenesisBlock())
      }

      const latestBlock = blockchain[blockchain.length - 1]
      const previousHash = latestBlock.hash
      const timestamp = new Date().toLocaleString("en-GB")
      const blockId = latestBlock.blockId + 1
      const status = "inChain"

      block = await BlockModel.findOneAndUpdate(
        { _id: blockID },
        {
          blockId: blockId,
          prevHash: previousHash,
          timestamp: timestamp,
          status: status,
          hash: createHash("sha256")
            .update(
              blockId.toString() +
                previousHash +
                timestamp +
                JSON.stringify(block.transactions)
            )
            .digest("hex"),
        },
        {
          new: true,
        }
      )
    }

    const rejectedPercentage =
      block.rejectedBy.length / parseFloat(validators.length)

    if (rejectedPercentage >= CONSENSUS_THRESHOLD) {
      block = await BlockModel.findOneAndUpdate(
        { _id: blockID },
        { status: "Rejected" },
        { new: true }
      )
    }
  }

  let message
  isApproved
    ? (message = "You have approved this block")
    : (message = "You have rejected this block")

  res.status(200).json({ message: message, block })
}

function createGenesisBlock() {
  let genesisBlock = new Blockchain().chain[0]
  genesisBlock.blockId = 0
  genesisBlock.status = "inChain"
  genesisBlock.transactions = []
  return genesisBlock
}

// create block page process in user interface
// 1. first validator must check if there already exist a pending block in the database via a "checkBlock" button
// 2. if yes, then consensus will take place.
// if no, validator can start fetching transactions to create a block
// 3. if transactions hit the specific number, validator can initiate a create block request
// once the request is sent, the initial block structure with only timestamp, transactions and status will be created in the database
// only after consensus is successful, then we attach the block to the blockchain
// and fill up the blockId, prevHash, hash and etc.
// so only a complete block structure document in the database will be considered in the blockchain

// createBlock pseudocode

// 1. get the transaction ID of the transactions to be added into the block
// 2. update the transactions status to "packaging"
// 3. create the block in the database only with timestamps, transactions and status

// approveBlock pseudocode

// 1. get the block id, transactions id from the get request
// 2. copy paste the transaction controller logic
// 3. if consensus has reached:
// 3.1 fetch the blockchain
// 3.2 find the last block and obtain its previous hash
// 3.3 if blockchain has not been created, create a genesis block
// 3.4 create a new Block object and store the data into the object
// question: should we only store transaction id or the whole transaction data.
// else just add username into approveBy or rejectedBy
// question: should we loop through the transactions and validate each of them again?

module.exports = {
  getAllBlocks,
  getBlock,
  createBlock,
  approveBlock,
}
