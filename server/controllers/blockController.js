const BlockModel = require("../models/block")
const UserModel = require("../models/user")
const transactionController = require("./transactionController")
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors")
const CONSENSUS_THRESHOLD = 0.66
const FIRST_BLOCK = 0
const MAX_RECORD = 2
let LATEST_BLOCK
const { createHash } = require("crypto")

const getAllBlocks = async (req, res) => {
  let blockchain = await BlockModel.find({})
  if (blockchain.length == 0) {
    await createGenesisBlock()
    await createHibernateBlock()
    blockchain = "Genesis and hibernate blocks are created"
  }
  res.status(200).json({ Blockchain: blockchain })
}

const getBlock = async (req, res) => {
  const { id: blockID } = req.params
  const selectedBlock = await BlockModel.find({ _id: blockID })
  res.status(200).json({ details: selectedBlock })
}

const activateBlock = async (req, res) => {
  const { id: blockID } = req.params
  const { role } = req.user

  if (role !== "Validator") {
    throw new UnauthenticatedError("Not authorized")
  }

  let isMaxRecord = await checkRecordCapacity()
  if (isMaxRecord) {
    await BlockModel.findOneAndUpdate(
      { _id: blockID },
      {
        status: "Pending",
        timestamp: new Date().toLocaleString("en-GB"),
      },
      { new: true }
    )
    res.status(200).json({ msg: `Block ${blockID} is activated` })
  } else {
    res.status(403).json({ msg: "Block cannot be activated" })
  }
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

  if (block.status === "Approved") {
    block = await pushBlock(blockID)
    await createHibernateBlock()
  }

  let message
  isApproved
    ? (message = "You have approved this block")
    : (message = "You have rejected this block")

  res.status(200).json({ message: message, block })
}

async function createGenesisBlock() {
  const timestamp = new Date().toLocaleString("en-GB")
  const previousHash = ""
  const noRecord = ""
  const genesisBlock = await BlockModel.create({
    blockId: FIRST_BLOCK,
    prevHash: previousHash,
    hash: await hashing(FIRST_BLOCK, previousHash, timestamp, noRecord),
    timestamp: timestamp,
    status: "inChain",
  })
  return genesisBlock
}

async function createHibernateBlock() {
  const hibernateBlock = await BlockModel.create({
    timestamp: new Date().toLocaleString("en-GB"),
  })
  return hibernateBlock
}

async function checkRecordCapacity() {
  LATEST_BLOCK = await getLatestBlock()
  return LATEST_BLOCK.records.length === MAX_RECORD
}

async function getLatestBlock() {
  return await BlockModel.findOne({ hash: null })
}

async function pushBlock(blockID) {
  const blockIndex = await BlockModel.collection.countDocuments()
  const prevBlock = await BlockModel.findOne({ blockId: blockIndex - 2 })
  const timestamp = new Date().toLocaleString("en-GB")
  const block = await BlockModel.findOneAndUpdate(
    { _id: blockID },
    {
      blockId: blockIndex - 1,
      prevHash: prevBlock.hash,
      hash: await hashing(
        blockIndex - 1,
        prevBlock.hash,
        timestamp,
        blockID.records
      ),
      timestamp: timestamp,
      status: "inChain",
    },
    { new: true }
  )
  await transactionController.updateStatus()
  return block
}

async function hashing(blockIndex, prevBlock, timestamp, record) {
  return createHash("sha256")
    .update(String(blockIndex) + prevBlock + timestamp + JSON.stringify(record))
    .digest("hex")
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
  approveBlock,
  activateBlock,
}
