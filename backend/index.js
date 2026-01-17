const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db.js')
const userRouter = require('./routes/userRoutes.js')
const empRouter = require('./routes/empRoutes.js')
const app = express()
dotenv.config()


const PORT =process.env.PORT || 5000

app.use('/uploads',express.static('uploads/'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())


app.use('/api',userRouter)
app.use('/api',empRouter)



app.get('/',(req,res)=>{
    res.send("API IS CALLING")
})


app.listen(PORT,()=>{
    console.log(`Server is Running ${PORT}`)
})


