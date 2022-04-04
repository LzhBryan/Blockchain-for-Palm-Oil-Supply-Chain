const ProductModel = require("../models/product")
const SupplyChainModel = require("../models/supplychain")
const { NotFoundError } = require("../errors")

const searchProduct = async (req, res) => {
  const { id: productId } = req.params
  let FIRST_STAGE = false
  let record = []

  const product = await ProductModel.findOne({ productId: productId })
  if (!product) {
    throw new NotFoundError(`No item with id ${productId}`)
  }

  let tracing = await SupplyChainModel.findOne({
    batchId: product.prevBatchId,
  })

  while (!FIRST_STAGE) {
    record.push(tracing)
    tracing = await SupplyChainModel.findOne({
      batchId: tracing.previousBatchId,
    })
    if (tracing.previousBatchId == "") {
      record.push(tracing)
      FIRST_STAGE = true
    }
  }
  res.status(200).json({ msg: "Record", product, record })
}

module.exports = {
  searchProduct,
}
