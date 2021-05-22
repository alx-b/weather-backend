import mongoose from "mongoose"

const citySchema = new mongoose.Schema({
    name: { type: String, allowNull: false, required: true },
    state: { type: String, allowNull: true, required: false },
    country: { type: String, allowNull: true, required: false },
    latitude: { type: String, allowNull: false, required: true },
    longitude: { type: String, allowNull: false, required: true }
})

const City = mongoose.model("City", citySchema)

export default City
