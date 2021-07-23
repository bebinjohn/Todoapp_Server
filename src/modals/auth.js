const mongoose=require('mongoose')

const User=mongoose.Schema({
    Name:String,
    Email:String,
    Password:String,
    Image:String,
    createdAt:{
        type:Date,
        default:new Date()
    }
})

const User_modal=mongoose.model('User_modal',User)

module.exports=User_modal