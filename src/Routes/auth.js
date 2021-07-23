const express=require('express')
const {Login,Signup,getUsers,googlelogin} =require('../controllers/auth')
const Route=express.Router()

Route.post('/login',Login)

Route.post('/signup',Signup)

Route.get('/users',getUsers)

Route.post('/google',googlelogin)

module.exports=Route