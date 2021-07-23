
const mongoose=require('mongoose')


const Post=mongoose.Schema({
    Title:String,
    Status:String,
    Type:String,
    Members:[Object],
    completed:{
        type:Boolean,
        default:false
    },
    User_id:mongoose.Types.ObjectId,

    CreatedAt:{
        type:Date,
        default:new Date()
    }
})

const post_model=mongoose.model('post_model',Post);

module.exports=post_model;