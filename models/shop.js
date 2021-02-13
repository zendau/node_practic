const mongoose = require("mongoose")
const { Schema, model } = mongoose

const shopSchema = new Schema({
    title: String,
    img: String,
    desk: String,
    price: Number
})

module.exports = model("Shop", shopSchema)