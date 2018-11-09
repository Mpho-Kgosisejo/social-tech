import express from "express"
import path from "path"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import BluebiredPromise from "bluebird"

import auth from "./routes/auth"
import user from "./routes/user"

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
mongoose.Promise = BluebiredPromise
mongoose.connect(process.env.MONGODB_URL, {
    useMongoClient: true
})

app.use("/auth", auth)
app.use("/user", user)

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.listen(port, () => {
    console.log(`Running on localhost:${port}`)
})