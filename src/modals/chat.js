const mongoose=require('mongoose')

const Chat_Schema=mongoose.Schema({
    Messages:[Object]
})

const Chat_modal=mongoose.model('Chat_modal',Chat_Schema);

module.exports=Chat_modal;