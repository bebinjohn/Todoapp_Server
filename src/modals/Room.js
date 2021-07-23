const mongoose=require('mongoose')

const Room_Schema=mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true
    },
    Members:{
        type:[Object]
    },
    Image:String,
    Description:String
},{timestamps:true})

const Room_model=mongoose.model('Room_model',Room_Schema);

module.exports=Room_model;