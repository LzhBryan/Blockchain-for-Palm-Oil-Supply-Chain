require("dotenv").config()
require("express-async-errors")

// express
const express = require("express")
const app = express()

// packages
const cors = require("cors")

// database
const mongoose = require("mongoose")

// routers
const transactionRouter = require("./routes/transactionRoutes")
const authRouter = require("./routes/authRoutes")
const blockRouter = require("./routes/blockRoutes")

// middleware
const errorHandlerMiddleware = require("./middleware/error-handler")
const notFoundMiddleware = require("./middleware/not-Found")

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/transactions", transactionRouter)
app.use("/api/blocks", blockRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3001
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to database...")
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
