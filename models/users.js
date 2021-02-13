const mongoose = require("mongoose")
const { Schema, model } = mongoose

const usersSchema = new Schema({
    login: String,
    password: String,
    email: String,
    basket: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Shop' 
    }]
})

module.exports = model("Users", usersSchema)