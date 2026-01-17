const express = require('express')
const router = express.Router()
const User = require('../model/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/save',async(req,res)=>{
    try{
        const {userName,userEmail,userPassword} = req.body

        if(!userName|| !userEmail || !userPassword){
           return res.status(400).json({
                success : false,
                message: "ALL field Requred"
            })
        }

        const exitingUser = await User.findOne({userEmail})
        if(exitingUser){
           return res.status(400).json({
                success:false,
                message: "user alreday register"
            })
        }

        const hashPassword = await bcrypt.hash(userPassword,10)

        const user = new User({
            userName,
            userEmail,
            userPassword:hashPassword
        })

        await user.save()

        res.status(201).json({
            success: true,
            message: "User Register Succesfully",
            data:user
        })

    }
    catch(err){

        res.status(500).json({
            success: false ,
            message: "Server Error",
            error:err
        })


    }
})


router.post('/login',async(req,res)=>{
  try{
    const {userEmail,userPassword} = req.body

    if(!userEmail || !userPassword){
       return res.status(400).json({
            success:false,
            message: "all field requried",

        })
    }
    const user = await User.findOne({userEmail})
    if(!user){
      return  res.status(400).json({
            success:false,
            message: "User Not Found"
        })
    }

    const isMatch = await bcrypt.compare(userPassword,user.userPassword)
    if(!isMatch){
       return res.status(400).json({
            success:false,
            message: "Password Incorrect"
        })
    }

    const token = jwt.sign({
        id:user._id
    },process.env.SECRET,{
        expiresIn: '1h'
    }
)

res.status(200).json({
    success:true,
    message:"Login Succesfully",
    data: user,token
})



  }
  catch(err){
    res.status(500).json({
        success:false,
        message: "server error"
    })

  }
})

module.exports = router