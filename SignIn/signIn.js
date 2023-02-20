const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const jwt = require('jsonwebtoken')
const SIGNIN = mongoose.model('SIGNIN')
const REGISTER = mongoose.model('REGISTER')

const secretKey = "secretkey"

router.post('/signin', async (req, res) => {
    try {
        let token;
        const { emailOrMobile, password } = req.body
        const userEmail = await REGISTER.findOne({ Email: emailOrMobile })
        if (!userEmail || emailOrMobile != userEmail.Email) {
            console.log("Invalid Email or Password")
            return res.status(400).send("Invalid Email or Password")

        }
        else if (emailOrMobile != userEmail.Email) {
            console.log("Invalid Email")
            return res.status(400).send("Invalid Email")

        }
        else if (password != userEmail.Password) {
            console.log("Invalid Password")
            res.status(400).send("Invalid Password")
        }
        if(userEmail) {
            token = await userEmail.getAuthToken()

            return res.cookie("accesstoken", token, {
                    httpOnly: true,
                })
                .status(200)
                .json({ message: "Logged in successfully" ,token});

          

        }
    }
    catch (e) {
        console.log(e)
    }
})

module.exports = router;



