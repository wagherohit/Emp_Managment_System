const mongoose = require('mongoose')


const empSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    userPhone:Number,
    userGender:String,
    userDepartment:String,
    userState:String,
    userCity:String,
    userPincode:Number,
    userAddress:String,
    userIspermanent:Boolean,
    image:String
})

module.exports= mongoose.model('emp',empSchema)