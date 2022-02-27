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
const userRouter = require("./routes/authRoutes")

// middleware
const errorHandlerMiddleware = require("./middleware/error-handler")
const notFoundMiddleware = require("./middleware/not-Found")
const authenticationMiddleware = require("./middleware/authentication")

app.use(cors())
app.use(express.json())

app.use("/api/transactions", authenticationMiddleware, transactionRouter)
app.use("/api/user", userRouter)

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
