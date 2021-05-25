import CityController from "../controllers/city.controller"
import * as express from "express"

const routes = (app: express.Application) => {
    app.get("/city", CityController.getCities)
    app.post("/city", CityController.addCity)
    app.get("/city/:name", CityController.getCityByName)
}

export default {
    routes
}
