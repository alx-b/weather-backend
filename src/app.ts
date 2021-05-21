import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()
const {PORT, DEV_DB_URL, PROD_DB_URL, ENV} = process.env

const app: express.Application = express()

app.use(express.json())
app.use(cors({credentials: true}))

app.get("/", (_, res: express.Response) => {
    res.send("HELLO!")
})

app.listen(PORT, () => console.log("Server is running!"))

const connectToDatabase = async () => {
    const databaseURL: any = ENV === 'DEVELOPMENT' ? DEV_DB_URL : PROD_DB_URL
    await mongoose.connect(databaseURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
        .then(() => console.log("Successfully connected to the database"))
        .catch(() => {
            console.log(`Error: Could not connect to the database`)
            process.exit()
        })
}
connectToDatabase()
