const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcrypt');
const REGISTER = mongoose.model('REGISTER')


router.post("/register", async (req, res) => {
    try {
        const { Name, Email, Phone, State, District, Address, Pincode, Password, ConfirmPassword, TermsNConditions } = req.body
        if (!Name || !Email || !Phone || !State || !District || !Address || !Pincode || !Password || !ConfirmPassword) {
            console.log("please fill all field")
            return res.status(422).send("please fill all field")
        }
        else if (await REGISTER.findOne({ Email })) {
            console.log("Email Already in Use")
            return res.status(400).send("Email Already in Use")
        }
        else if (await REGISTER.findOne({ Phone })) {
            console.log("Phone Number Already in Use")
            return res.status(400).send("Phone Already in Use")
        }
        else if (Password != ConfirmPassword) {
            console.log("Passwords do NOT Match")
            return res.status(400).send("Passwords do NOT Match")
        }
        else if (!TermsNConditions) {
            console.log("Agree all T & C")
            return res.status(400).send("Agree all T & C")
        }

        const password = req.body.Password
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.Password = hashedPassword

        // const register = new REGISTER({
        //     ...{ Name, Email, Phone, State, District, Address, Pincode, Password }
        // })
        const newRegister = new REGISTER(req.body)
        const registerData = await newRegister.save()
        console.log(newRegister)
        res.json({ message: "Registration Successfull" })
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router