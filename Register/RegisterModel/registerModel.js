const mongoose = require("mongoose")

const registerSchema = new mongoose.Schema({
    Name: {type: String, required: true},
    Email: {type: String, required: true},
    Phone: {type: Number, required: true},
    State: {type: String, required: true},
    District: {type: String, required: true},
    Address: {type: String, required: true},
    Pincode: {type: Number, required: true},
    Password: {type: String, required: true}
})

// module.exports = {Register: mongoose.model("RegisterUser", registerSchema)}

mongoose.model("REGISTER", registerSchema)