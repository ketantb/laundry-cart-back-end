const express = require('express')
const mongoose = require('mongoose')
const router  = express.Router()
const REGISTER = mongoose.model('REGISTER')


router.post("/register", async(req, res) => {
    const{Name, Email, Phone, State, District, Address, Pincode, Password, ConfirmPassword, TermsNConditions} = req.body
    if(!Name || !Email || !Phone || !State || !District || !Address || !Pincode || !Password || !ConfirmPassword){
        console.log("please fill all field")
        return res.status(422).send("please fill all field")
    }
    else if(await REGISTER.findOne({Email})){
        console.log("Email Already in Use")
        return res.status(400).send("Email Already in Use")
    }
    else if(await REGISTER.findOne({Phone})){
        console.log("Phone Number Already in Use")
        return res.status(400).send("Phone Already in Use")
    }
    else if(Password != ConfirmPassword){
        console.log("Passwords do NOT Match")
        return res.status(400).send("Passwords do NOT Match")
    }
    else if(!TermsNConditions){
        console.log("Agree all T & C")
        return res.status(400).send("Agree all T & C")
    }     
    const register = new REGISTER({
        ...{Name, Email, Phone, State, District, Address, Pincode, Password}
    })
     try{
        console.log(register)
        res.json({message: "Registration Successfull"})
    const registerData = await register.save()
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router