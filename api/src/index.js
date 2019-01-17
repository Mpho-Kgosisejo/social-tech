import express from "express"
import path from "path"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import BluebiredPromise from "bluebird"
import morgan from "morgan"

import auth from "./routes/auth"
import user from "./routes/user"
import menu from "./routes/menu"
import product from "./routes/products";
import order from "./routes/order"

import chef from "./routes/abouts routes/chefs"
import contactUS from "./routes/abouts routes/contactus"
import FAQs from './routes/abouts routes/faqs'
import story from './routes/abouts routes/story'
import abouts from './routes/abouts routes/abouts'
import catering from "./routes/catering"

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(morgan("dev"))
app.use(`/${process.env.UPLOADS_PATH}`, express.static(`./${process.env.UPLOADS_PATH}`))
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
app.use("/menus", menu)
app.use("/products", product)
app.use("/order", order)

// abouts routes 
app.use("/abouts", abouts)
app.use("/chefs", chef)
app.use("/contact-us", contactUS)
app.use("/faqs", FAQs)
app.use("/ourstory", story)
app.use("/catering", catering)

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