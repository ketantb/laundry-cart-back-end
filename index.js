const express = require('express')
const app = express()
const cors = require("cors");
const PORT = 8080 || process.env.PORT;
var bodyParser = require("body-parser");
const ordersroute = require("./Order/order");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

require('./connectiondb.js')
require('./Order/orderModel/ordermodel')
require('./Register/RegisterModel/registerModel')
require('./SignIn/signInModel/signInModel')
app.use(express.json())
app.use(cookieParser());
app.use(require('./Register/register'))
app.use(require('./SignIn/signIn'))
app.use(require('./Order/order'))
app.use("/createorder", ordersroute);


app.get('/', (req, res) => {
  res.status(200).send("Welcome to laundary cart")
})

app.get('/hii', (req, res) => {
  res.cookie('name', 'geeksforgeeks')
  res.send(req.rootUser)
})

app.listen(PORT, () => console.log(` app listening on port ${PORT}!`))