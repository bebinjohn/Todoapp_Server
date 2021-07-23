const express=require('express')
const {Post,Get_todo,Update_todo,del_post,NOT} =require('../controllers/todo')
const {edit_middle}=require('../middlewares/auth')
const Route=express.Router()

Route.post('/post',Post);

Route.get('/',Get_todo)

Route.post('/update',edit_middle,Update_todo)

Route.post('/delete',edit_middle,del_post)

Route.post('/total',NOT)

module.exports=Route;