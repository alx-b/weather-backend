import mongoose from "mongoose"

// ! unique is NOT a validator, just a reminder.
const citySchema = new mongoose.Schema({
    name: { type: String, allowNull: false, required: true, unique: true },
    latitude: { type: String, allowNull: false, required: true },
    longitude: { type: String, allowNull: false, required: true }
})

const City = mongoose.model("City", citySchema)

export default City
