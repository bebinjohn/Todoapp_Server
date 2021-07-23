const express=require('express')
const {createRoom,updateroom,exitroom,getall,postmessage,get_messages,getbylimit}=require('../controllers/chat')
const Route=express.Router()


Route.post('/',createRoom)
Route.post('/update',updateroom)
Route.post('/delete',exitroom)
Route.post('/message',postmessage)
Route.get('/msg/:id',get_messages)
Route.get('/get',getall);
Route.get('/msg/:id/:limit',getbylimit)
module.exports=Route