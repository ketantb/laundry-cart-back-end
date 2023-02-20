const jwt =require("jsonwebtoken")
const mongoose = require('mongoose')
const REGISTER =require('./Register/RegisterModel/registerModel')



const Authenticate =async (req,res,next)=>{
    console.log("i am here")
    try {
        const token =req.cookies.accesstoken;
        const verifyToken=jwt.verify(token,process.env.SECERTKEY);

        const rootUser=await REGISTER.findOne({_id:verifyToken._id,"tokens.token":token})

        if(!rootUser){throw new Error('user not found')}

        req.token=token;
        req.rootUser=rootUser;
        req.userID=rootUser._id;
        
        next()
    } catch (error) {
        res.status(401).send("User Token not match")
        console.log(error)
    }
}
module.exports=Authenticate