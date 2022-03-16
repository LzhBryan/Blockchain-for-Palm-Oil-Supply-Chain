const ProductModel = require("../models/product")

const searchProduct = async (req, res) => {
  const { id: productID } = req.body
  const product = await ProductModel.findOne({ _id: productID })
  if (!product) {
    throw new NotFoundError(`No item with id ${productID}`)
  }
}

async function createProduct(previousBatchId) {
  const productID = await ProductModel.collection.countDocuments()
  const new_product = await ProductModel.create({
    productId: productID,
    prevBatchId: previousBatchId,
    timestamp: new Date().toLocaleString("en-GB"),
  })
}

module.exports = {
  createProduct,
  searchProduct,
}
