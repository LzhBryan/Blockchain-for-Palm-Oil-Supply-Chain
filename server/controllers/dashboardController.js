const BlockModel = require("../models/block")
const TransactionModel = require("../models/transaction")
const SupplyChainModel = require("../models/supplychain")
const ProductModel = require("../models/product")
const UserModel = require("../models/user")

const getApprovedRejectPercentage = async (req, res) => {
  const approvedBlocks = await BlockModel.find({
    $or: [{ status: "inChain" }, { status: "Approved" }],
  }).count()

  const rejectedBlocks = await BlockModel.find({ status: "Rejected" }).count()

  const approvedTransactions = await TransactionModel.find({
    $or: [{ status: "inChain" }, { status: "Approved" }, { status: "inBlock" }],
  }).count()

  const rejectedTransactions = await TransactionModel.find({
    status: "Rejected",
  }).count()

  const approvedRecords = await SupplyChainModel.find({
    $or: [{ status: "inChain" }, { status: "Approved" }, { status: "inBlock" }],
  }).count()

  const rejectedRecords = await SupplyChainModel.find({
    status: "Rejected",
  }).count()

  const approvedTotal = approvedBlocks + approvedTransactions + approvedRecords
  const rejectedTotal = rejectedBlocks + rejectedTransactions + rejectedRecords

  res.status(200).json({ approvedTotal, rejectedTotal })
}

const getWeeklyCreatedBlocks = async (req, res) => {
  const weekRange = getCurrentWeek()

  const firstDayBlocks = await BlockModel.find({
    $and: [
      { status: "inChain" },
      { timestamp: { $gte: weekRange[0], $lt: weekRange[1] } },
    ],
  }).count()

  const secondDayBlocks = await BlockModel.find({
    $and: [
      { status: "inChain" },
      { timestamp: { $gte: weekRange[1], $lt: weekRange[2] } },
    ],
  }).count()

  const thirdDayBlocks = await BlockModel.find({
    $and: [
      { status: "inChain" },
      { timestamp: { $gte: weekRange[2], $lt: weekRange[3] } },
    ],
  }).count()

  const fourthDayBlocks = await BlockModel.find({
    $and: [
      { status: "inChain" },
      { timestamp: { $gte: weekRange[3], $lt: weekRange[4] } },
    ],
  }).count()

  const fifthDayBlocks = await BlockModel.find({
    $and: [
      { status: "inChain" },
      { timestamp: { $gte: weekRange[4], $lt: weekRange[5] } },
    ],
  }).count()

  const sixthDayBlocks = await BlockModel.find({
    $and: [
      { status: "inChain" },
      { timestamp: { $gte: weekRange[5], $lt: weekRange[6] } },
    ],
  }).count()

  const seventhDayBlocks = await BlockModel.find({
    $and: [
      { status: "inChain" },
      { timestamp: { $gte: weekRange[6], $lt: weekRange[7] } },
    ],
  }).count()

  res.status(200).json({
    weeklyBlocks: [
      firstDayBlocks,
      secondDayBlocks,
      thirdDayBlocks,
      fourthDayBlocks,
      fifthDayBlocks,
      sixthDayBlocks,
      seventhDayBlocks,
    ],
  })
}

const getWeeklyCreatedTransactions = async (req, res) => {
  const weekRange = getCurrentWeek()

  const firstDayTransactions = await TransactionModel.find({
    timestamp: { $gte: weekRange[0], $lt: weekRange[1] },
  }).count()

  const secondDayTransactions = await TransactionModel.find({
    timestamp: { $gte: weekRange[1], $lt: weekRange[2] },
  }).count()

  const thirdDayTransactions = await TransactionModel.find({
    timestamp: { $gte: weekRange[2], $lt: weekRange[3] },
  }).count()

  const fourthDayTransactions = await TransactionModel.find({
    timestamp: { $gte: weekRange[3], $lt: weekRange[4] },
  }).count()

  const fifthDayTransactions = await TransactionModel.find({
    timestamp: { $gte: weekRange[4], $lt: weekRange[5] },
  }).count()

  const sixthDayTransactions = await TransactionModel.find({
    timestamp: { $gte: weekRange[5], $lt: weekRange[6] },
  }).count()

  const seventhDayTransactions = await TransactionModel.find({
    timestamp: { $gte: weekRange[6], $lt: weekRange[7] },
  }).count()

  res.status(200).json({
    weeklyTransactions: [
      firstDayTransactions,
      secondDayTransactions,
      thirdDayTransactions,
      fourthDayTransactions,
      fifthDayTransactions,
      sixthDayTransactions,
      seventhDayTransactions,
    ],
  })
}

const getWeeklyCreatedRecords = async (req, res) => {
  const weekRange = getCurrentWeek()

  const firstDayRecords = await SupplyChainModel.find({
    timestamp: { $gte: weekRange[0], $lt: weekRange[1] },
  }).count()

  const secondDayRecords = await SupplyChainModel.find({
    timestamp: { $gte: weekRange[1], $lt: weekRange[2] },
  }).count()

  const thirdDayRecords = await SupplyChainModel.find({
    timestamp: { $gte: weekRange[2], $lt: weekRange[3] },
  }).count()

  const fourthDayRecords = await SupplyChainModel.find({
    timestamp: { $gte: weekRange[3], $lt: weekRange[4] },
  }).count()

  const fifthDayRecords = await SupplyChainModel.find({
    timestamp: { $gte: weekRange[4], $lt: weekRange[5] },
  }).count()

  const sixthDayRecords = await SupplyChainModel.find({
    timestamp: { $gte: weekRange[5], $lt: weekRange[6] },
  }).count()

  const seventhDayRecords = await SupplyChainModel.find({
    timestamp: { $gte: weekRange[6], $lt: weekRange[7] },
  }).count()

  res.status(200).json({
    weeklyRecords: [
      firstDayRecords,
      secondDayRecords,
      thirdDayRecords,
      fourthDayRecords,
      fifthDayRecords,
      sixthDayRecords,
      seventhDayRecords,
    ],
  })
}

const getWeeklyCreatedProducts = async (req, res) => {
  const weekRange = getCurrentWeek()

  const firstDayProducts = await ProductModel.find({
    timestamp: { $gte: weekRange[0], $lt: weekRange[1] },
  })

  const firstDayPalmOil = firstDayProducts.filter(
    (product) => product.productName === "PALM OIL"
  ).length

  const firstDayPalmKernelOil = firstDayProducts.filter(
    (product) => product.productName === "PALM KERNEL OIL"
  ).length

  const firstDayBiofuel = firstDayProducts.filter(
    (product) => product.productName === "BIOFUEL"
  ).length

  const secondDayProducts = await ProductModel.find({
    timestamp: { $gte: weekRange[1], $lt: weekRange[2] },
  })

  const secondDayPalmOil = secondDayProducts.filter(
    (product) => product.productName === "PALM OIL"
  ).length

  const secondDayPalmKernelOil = secondDayProducts.filter(
    (product) => product.productName === "PALM KERNEL OIL"
  ).length

  const secondDayBiofuel = secondDayProducts.filter(
    (product) => product.productName === "BIOFUEL"
  ).length

  const thirdDayProducts = await ProductModel.find({
    timestamp: { $gte: weekRange[2], $lt: weekRange[3] },
  })

  const thirdDayPalmOil = thirdDayProducts.filter(
    (product) => product.productName === "PALM OIL"
  ).length

  const thirdDayPalmKernelOil = thirdDayProducts.filter(
    (product) => product.productName === "PALM KERNEL OIL"
  ).length

  const thirdDayBiofuel = thirdDayProducts.filter(
    (product) => product.productName === "BIOFUEL"
  ).length

  const fourthDayProducts = await ProductModel.find({
    timestamp: { $gte: weekRange[3], $lt: weekRange[4] },
  })

  const fourthDayPalmOil = fourthDayProducts.filter(
    (product) => product.productName === "PALM OIL"
  ).length

  const fourthDayPalmKernelOil = fourthDayProducts.filter(
    (product) => product.productName === "PALM KERNEL OIL"
  ).length

  const fourthDayBiofuel = fourthDayProducts.filter(
    (product) => product.productName === "BIOFUEL"
  ).length

  const fifthDayProducts = await ProductModel.find({
    timestamp: { $gte: weekRange[4], $lt: weekRange[5] },
  })

  const fifthDayPalmOil = fifthDayProducts.filter(
    (product) => product.productName === "PALM OIL"
  ).length

  const fifthDayPalmKernelOil = fifthDayProducts.filter(
    (product) => product.productName === "PALM KERNEL OIL"
  ).length

  const fifthDayBiofuel = fifthDayProducts.filter(
    (product) => product.productName === "BIOFUEL"
  ).length

  const sixthDayProducts = await ProductModel.find({
    timestamp: { $gte: weekRange[5], $lt: weekRange[6] },
  })

  const sixthDayPalmOil = sixthDayProducts.filter(
    (product) => product.productName === "PALM OIL"
  ).length

  const sixthDayPalmKernelOil = sixthDayProducts.filter(
    (product) => product.productName === "PALM KERNEL OIL"
  ).length

  const sixthDayBiofuel = sixthDayProducts.filter(
    (product) => product.productName === "BIOFUEL"
  ).length

  const seventhDayProducts = await ProductModel.find({
    timestamp: { $gte: weekRange[6], $lt: weekRange[7] },
  })

  const seventhDayPalmOil = seventhDayProducts.filter(
    (product) => product.productName === "PALM OIL"
  ).length

  const seventhDayPalmKernelOil = seventhDayProducts.filter(
    (product) => product.productName === "PALM KERNEL OIL"
  ).length

  const seventhDayBiofuel = seventhDayProducts.filter(
    (product) => product.productName === "BIOFUEL"
  ).length

  res.status(200).json({
    weeklyProducts: [
      {
        palmOil: firstDayPalmOil,
        palmKernelOil: firstDayPalmKernelOil,
        biofuel: firstDayBiofuel,
      },
      {
        palmOil: secondDayPalmOil,
        palmKernelOil: secondDayPalmKernelOil,
        biofuel: secondDayBiofuel,
      },
      {
        palmOil: thirdDayPalmOil,
        palmKernelOil: thirdDayPalmKernelOil,
        biofuel: thirdDayBiofuel,
      },
      {
        palmOil: fourthDayPalmOil,
        palmKernelOil: fourthDayPalmKernelOil,
        biofuel: fourthDayBiofuel,
      },
      {
        palmOil: fifthDayPalmOil,
        palmKernelOil: fifthDayPalmKernelOil,
        biofuel: fifthDayBiofuel,
      },
      {
        palmOil: sixthDayPalmOil,
        palmKernelOil: sixthDayPalmKernelOil,
        biofuel: sixthDayBiofuel,
      },
      {
        palmOil: seventhDayPalmOil,
        palmKernelOil: seventhDayPalmKernelOil,
        biofuel: seventhDayBiofuel,
      },
    ],
  })
}

const getUsers = async (req, res) => {
  const planters = await UserModel.find({ role: "Planter" }).count()
  const millers = await UserModel.find({ role: "Miller" }).count()
  const refiners = await UserModel.find({ role: "Refiner" }).count()
  const warehouseManagers = await UserModel.find({
    role: "WarehouseManager",
  }).count()
  const retailers = await UserModel.find({ role: "Retailer" }).count()
  const validators = await UserModel.find({ role: "Validator" }).count()

  res.status(200).json({
    users: [
      planters,
      millers,
      refiners,
      warehouseManagers,
      retailers,
      validators,
    ],
  })
}

function getCurrentWeek() {
  let currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  let startingDate = currentDate.getDate() - currentDate.getDay()
  const secondDay = startingDate + 1
  const thirdDay = startingDate + 2
  const fourthDay = startingDate + 3
  const fifthDay = startingDate + 4
  const sixthDay = startingDate + 5
  const seventhDay = startingDate + 6
  let endingDate = startingDate + 7

  startingDate = new Date(currentDate.setDate(startingDate)).toLocaleString(
    "en-GB"
  )
  const secondDate = new Date(currentDate.setDate(secondDay)).toLocaleString(
    "en-GB"
  )
  const thirdDate = new Date(currentDate.setDate(thirdDay)).toLocaleString(
    "en-GB"
  )
  const fourthDate = new Date(currentDate.setDate(fourthDay)).toLocaleString(
    "en-GB"
  )
  const fifthDate = new Date(currentDate.setDate(fifthDay)).toLocaleString(
    "en-GB"
  )
  const sixthDate = new Date(currentDate.setDate(sixthDay)).toLocaleString(
    "en-GB"
  )
  const seventhDate = new Date(currentDate.setDate(seventhDay)).toLocaleString(
    "en-GB"
  )
  endingDate = new Date(currentDate.setDate(endingDate)).toLocaleString("en-GB")
  return [
    startingDate,
    secondDate,
    thirdDate,
    fourthDate,
    fifthDate,
    sixthDate,
    seventhDate,
    endingDate,
  ]
}

module.exports = {
  getApprovedRejectPercentage,
  getWeeklyCreatedBlocks,
  getWeeklyCreatedTransactions,
  getWeeklyCreatedRecords,
  getWeeklyCreatedProducts,
  getUsers,
}
