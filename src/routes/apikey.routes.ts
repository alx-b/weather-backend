import APIKeyController from "../controllers/apikey.controller"
import * as express from "express"

const routes = (app: express.Application) => {
    app.get("/api", APIKeyController.getAPIKey)
}

export default {
    routes
}
