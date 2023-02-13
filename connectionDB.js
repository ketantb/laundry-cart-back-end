const mongoose=require('mongoose')
require('dotenv').config();
const key = process.env.key
mongoose.set('strictQuery', true)
mongoose.connect(key)
mongoose.connection.on("connected",()=>console.log("Database Connected !!"))
mongoose.connection.on("error",()=>console.log("Database Connection error !!"))