const express = require('express')
const router = express.Router()
const Emp = require('../model/empModel.js')
const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
     cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
     cb(null, Date.now()+ "-" + file.originalname)
    }
})

const uploads = multer({storage:storage})


router.post('/register',uploads.single('image'),async(req,res)=>{
    try{
        const{userName,userEmail,userPhone,userGender,userDepartment,userState,userCity,userPincode,userAddress,userIspermanent}= req.body
        if(!req.file){
          return  res.status(400).json({
                success:false,
                message:"Image Is Required"
            })
        }

        const emp = new Emp({
            userName,
            userEmail,
            userPhone,
            userGender,
            userDepartment,
            userState,
            userCity,
            userPincode,
            userAddress,
            userIspermanent,
            image:req.file.path
        })

        await emp.save()

        res.status(201).json({
            success:true,
            message:"Emp Creted ",
            data:emp
        })

    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Server Error"
        })

    }

})


router.get('/userData',async(req,res)=>{
    try{

        const emp = await Emp.find()

        res.status(200).json({
            success:true,
            message:"ALL DATA Get",
            data:emp
        })


    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"server Error"
        })


    }

})

router.get('/userData/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const user = await Emp.findById(id)
        res.status(200).json({
            success:true,
            message:"single data get",
            data:user
        })

    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"server error"
        })

    }

})

router.put('/update/:id',uploads.single('image'),async(req,res)=>{
    try{
        const {id}=req.params
        if (req.file) {
        req.body.image = req.file.path
      }
        const user = await Emp.findByIdAndUpdate(id,req.body)

        res.status(200).json({
            success:true,
            message:"Update Success",
            data:user
        })

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Server Error"
        })


    }
})


router.delete('/delete/:id',async(req,res)=>{

    try{
        const {id}= req.params
        const emp = await Emp.findById(id)
        if(!emp){
            return res.status(400).json({
                success:false,
                message:" emp not found"
            })
        }

        fs.unlinkSync(emp.image)
         await Emp.findByIdAndDelete(req.params.id)

         res.status(200).json({
            success:true,
            message: "user Deleted"
         })

    }
    catch(err){

    }

})


module.exports = router