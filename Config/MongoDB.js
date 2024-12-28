const mongoose = require('mongoose')

const connectDB= async()=>{
    try{
        const mongoDb=await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('Database connected:',mongoDb.connection.host,mongoDb.connection.name)
    }catch (err){
        console.log(err.message)
        process.exit(1)
    }
}

module.exports=connectDB
