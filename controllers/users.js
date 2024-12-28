const Users= require('../models/userSchema')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

//@ desc    Register a user
//@ route  /api/user/register
//@ access public
const registerUser=async (req,res)=>{
    res.header({"x-powered-by":'Aganepes Ahmedow'})
    const {username,email,password} = req.body
    if(!username||!email||!password){
        res.status(400)
        throw new Error('All fields are mandatory')
    }
    const userAvailable=await Users.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error('User already registered')
    }
    const hashPassword= await bcrypt.hash(password,10)
    const user = await Users.create({username,email,password:hashPassword})
    if(user){
        res.status(201).json({id:user._id,email:user.email,password:user.password})
    }else{
        res.status(400)
        throw new Error('User data us not valid')
    }
}

//@ desc  Login a user
//@ router /api/user/login
//@ access public
const loginUser=async (req,res)=>{
    res.header({"x-powered-by":'Aganepes Ahmedow'})
    const {email,password}=req.body
    if(!email||!password){
        res.status(400)
        throw new Error('All fields are mandatory')
    }
    const user = await Users.findOne({email})
    const comparePassword = bcrypt.compareSync(password,user.password)
    if(user && comparePassword){
        const accessToken=jwt.sign(
        {user:{
                id:user._id,
                username:user.username,
                email:user.email
        }},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'1h'})
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error('login and password not valid')
    }
}

//@ desc Current a user 
//@ router /api/user/current
//@ access private
const currentUser=(req,res)=>{
    res.header({"x-powered-by":'Aganepes Ahmedow'})
    res.json(req.user)
}


module.exports={registerUser,loginUser,currentUser}