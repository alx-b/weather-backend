import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import morgan from "morgan"
import CityRoutes from "./routes/city.routes"

dotenv.config()
const {PORT, DEV_DB_URL, PROD_DB_URL, ENV} = process.env

const app: express.Application = express()

app.use(cors({credentials: true}))
app.use(express.json())
app.use(morgan('common'))

CityRoutes.routes(app)

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


export default app
