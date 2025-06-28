import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    user:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const userModel = mongoose.model('userModel', userSchema)
export default userModel