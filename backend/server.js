import express from 'express'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import db from './config/db.js'
import userModel from './Model/userModel.js'
dotenv.config()

db()

const port = process.env.PORT || 8001
const app = express()
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.post('/register', async ( req, res ) =>{
    const {name , password} = req.body
    const existingUser =  await userModel.findOne({user:name})
    console.log(existingUser)
    if(existingUser){
        return res.status(401).json({message:"user already exit"})
    }else{
    const hashedPassword = await bcrypt.hash(password, 10)
    
    await userModel.create({
        user:name,
        password:hashedPassword
    })
    const payload = {name:name}
    const token = jwt.sign(payload,process.env.SECRET_ACCESS_TOKEN)
    res.status(201).json({message:"created successfully",token})
}

})

app.post('/sign-in',async (req,res)=>{
    try{
        const {name,password} = req.body
        const user = await userModel.findOne({user:name})
        
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            return res.status(400).json({message:"wrong Password"})
        }
        else{
            const payload = {name:name}
            const token = jwt.sign(payload,process.env.SECRET_ACCESS_TOKEN)
            
            res.status(200).json({message:"logged in!",token})
        }

    }catch{
        res.status(500).json({message:"internal server error"})
    }
})

app.get("/contents", authenticate,(req,res)=>{
    res.status(200).json({user:req.user.name})
})


function authenticate(req,res,next){

    const authToken = req.headers.authorization
    const token = authToken.split(' ')[1]
    
    const legitUser = jwt.verify(token,process.env.SECRET_ACCESS_TOKEN)
    if(!legitUser){
        return res.redirect("http://localhost/5173/sign-in")
    }
    req.user = legitUser
    next()
}








app.listen(port, () => console.log(`server listening on port ${port}`))