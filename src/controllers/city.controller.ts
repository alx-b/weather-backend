import CityModel from "../models/city.model"
import express from "express"
import HttpStatus from "../httpStatusCode"


const getCities = async (_: express.Request, res: express.Response) => {
    try {
        const cities = await CityModel.find()
        res.status(HttpStatus.OK).send(cities)
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
}


const getCityByName = async (req: express.Request, res: express.Response) => {
    try {
        const city = await CityModel.findOne({name: req.params.name})
        res.status(HttpStatus.OK).send(city)
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
}


const isAlreadyInDatabase = async (newCity: any) => {
    const city = await CityModel.findOne({name: newCity.name})
    if (!city) {
        return false
    }
    return true
}

const addCity = async(req: express.Request, res: express.Response) => {
    const city = new CityModel(req.body)
    if (await isAlreadyInDatabase(city)){
        return res.status(HttpStatus.CONFLICT).send({message: "Already in database!"})
    }
    try {
        const databaseRes = await city.save()
        res.status(HttpStatus.CREATED).send(databaseRes)
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
}

export default {
    getCities,
    getCityByName,
    addCity
}
