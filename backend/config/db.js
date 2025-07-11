import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connect = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongoDB connected!!")
    }catch(e){
        console.log("error in connecting mongoDB",e)
        process.exit(1)
    }
}


export default connect