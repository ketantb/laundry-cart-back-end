const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const SIGNIN = mongoose.model('SIGNIN')
const REGISTER = mongoose.model('REGISTER')

const secretKey = "secretkey"

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body
        const userEmail = await REGISTER.findOne({ Email: email })
        console.log(req.body)
        if (!userEmail || email != userEmail.Email) {
            console.log("Invalid Email or Password")
            return res.status(400).send("Invalid Email or Password")

        }
        else if (email != userEmail.Email) {
            console.log("Invalid Email")
            return res.status(400).send("Invalid Email")

        }
        if (userEmail) {
            const passwordMatch = await bcrypt.compare(password, userEmail.Password)
            if (passwordMatch) {
                const dataTobeSentToFrontend = {
                    _id: userEmail._id
                }
                const token = jwt.sign(dataTobeSentToFrontend, "secretKey", { expiresIn: 10000 })

                res.status(200).send({
                    success: true,
                    message: 'Login Successful',
                    data: { token, userName: userEmail.Name }
                });

            }
            else {
                console.log("Invalid Password")
                res.status(400).send("Invalid Password")
            }
        }
    }
    catch (err) {
        res.status(400).send(err)
        console.log(err)
    }
})

module.exports = router;



