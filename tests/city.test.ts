import Chai from "chai"
import ChaiHTTP from "chai-http"
import { describe, it } from "mocha"
import app from "../src/app"

Chai.should()
Chai.use(ChaiHTTP)

const randomString = Math.random().toString(36).substring(3)

const testGetCities = () => {
    it('GET all cities from database', (done) => {
        Chai.request(app)
            .get("/city")
            .end((_, res) => {
                res.should.have.status(200)
                res.body.should.be.a("array")
                done()
            })
    })
}

const testGetCityByName = () => {
    const name: string = "Stockholm"

    it('GET a city by name from database', (done) => {
        Chai.request(app)
            .get("/city/${name}")
            .end((_, res) => {
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("name").eq(name)
                done()
            })
    })
}

const testAddCity = () => {
    const mockData = {
        name: randomString,
        state: randomString,
        country: randomString,
        latitude: randomString,
        longitude: randomString
    }

    it('POST city to database', (done) => {
        Chai.request(app)
            .post("/city")
            .send(mockData)
            .end((_, res) => {
                res.should.have.a.status(201)
                res.body.should.be.a("object")
                res.body.should.have.property("name").eq(mockData.name)
                done()
            })
    })
}


describe("Testing city api routes", () => {
    testGetCities()
    testGetCityByName()
    testAddCity()
})
