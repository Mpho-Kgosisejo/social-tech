import express from "express"
import path from "path"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import BluebiredPromise from "bluebird"
import morgan from "morgan"

import auth from "./routes/auth"
import user from "./routes/user"
import menu from "./routes/menus"

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(morgan("dev"))
app.use(bodyParser.json())
mongoose.Promise = BluebiredPromise
mongoose.connect(process.env.MONGODB_URL, {
    useMongoClient: true
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

    if (req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")

        return (res.status(200).json({}))
    }
    next()
})

app.use("/auth", auth)
app.use("/user", user)
app.use("/menus",menu)

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.use((req, res, next) => {
    const error = new Error("Endpoint Not Found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        data: {
            error: {
                message: error.message
            }
        }
    })
})

app.listen(port, () => {
    console.log(`Running on localhost:${port}`)
})