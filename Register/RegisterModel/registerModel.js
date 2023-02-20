const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')

const registerSchema = new mongoose.Schema({
    Name: {type: String, required: true},
    Email: {type: String, required: true},
    Phone: {type: Number, required: true},
    State: {type: String, required: true},
    District: {type: String, required: true},
    Address: {type: String, required: true},
    Pincode: {type: Number, required: true},
    Password: {type: String, required: true},
    tokens:[
        {
            token:{type:String,required:true}
        }
    ]
})
registerSchema.methods.getAuthToken= async function(){
    try{
        let token=jwt.sign({_id:this._id},process.env.SECERTKEY);
        this.tokens=this.tokens.concat({token: token })
        await this.save()
        return token;
    }catch(error){
        console.log(error)
    }
}
// module.exports = {Register: mongoose.model("RegisterUser", registerSchema)}

const REGISTER = mongoose.model("REGISTER", registerSchema)

module.exports =REGISTER;