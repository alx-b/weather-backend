import * as express from "express"
import HttpStatus from "../httpStatusCode"
import dotenv from "dotenv"

dotenv.config()
const {OPEN_WEATHER_API_KEY} = process.env

const getAPIKey = async (_: express.Request, res: express.Response) => {
    try {
        res.status(HttpStatus.OK).send({apikey: OPEN_WEATHER_API_KEY})
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
}

export default {
    getAPIKey
}
