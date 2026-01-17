const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()


const connectDB = async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/empDB`)
        console.log('Mongodb Connected')
        console.log(mongoose.connection.readyState)


    }
    catch(err){
        console.log("Mongodb Failed",err)
        console.log(mongoose.connection.readyState)

    }
}

connectDB()

module.exports = connectDB