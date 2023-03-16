const mongoose = require("mongoose")

const signInSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
})

mongoose.model("SIGNIN", signInSchema)