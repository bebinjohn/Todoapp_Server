const Room_model = require("../modals/Room")
const Chat_modal=require('../modals/chat')
let limited=20;
const createRoom=async(req,res)=>{
    const data=req.body
    try {
        const Room=new Room_model(data);
        await Room.save();
        const message=new Chat_modal({_id:Room._id,Messages:[]})
        await message.save();
        const all_data=await Room_model.find()
        process.chat(all_data);
        res.status(200).json({Room})
    } catch (error) {
        res.status(400).send(new Error('something went Wrong!!'))
    }
}
//Update the room
const updateroom=async(req,res)=>{
    const data=req.body;
    const {_id}=req.body;
    try {
       const updated_data= await Room_model.findByIdAndUpdate(_id,data);
       const all_data=await Room_model.find()
       process.chat(all_data);
       res.status(200).json({updated_data}) 
    } catch (error) {
        res.status(400).send(new Error('something went Wrong!!'))
    } 
}

//delete the Room

const exitroom=async(req,res)=>{
    const {Room,user_id}=req.body
    console.log(user_id)
    try {
        const New_members=Room.Members.filter((each)=>{
            return each?._id!==user_id
        })
        const updated_room=await Room_model.findByIdAndUpdate(Room?._id,{"Members":New_members})
        const all_data=await Room_model.find()
        process.chat(all_data);
        res.status(200).json({updated_room})
    } catch (error) {
        res.status(400).send(new Error('something went Wrong!!'))
    }
}
//get all the rooms

const getall=async(req,res)=>{
        try {
            const all_data=await Room_model.find()
            res.status(200).json({Data:all_data})
        } catch (error) {
            res.status(400).send(new Error('something went Wrong!!'))
        }
}

//post message
// const postmessage=async(req,res)=>{
//     const data=req.body;
//     const all_messages=await Room_model.findById(data.Room_id);
//     const messages=[...all_messages.Messages,{user:data.user,message:data.text}];
//     try {
//         const updated_data=await Room_model.findByIdAndUpdate(data.Room_id,{Messages:messages})
//         const all_data=await Room_model.find()
//     process.chat(all_data);
//         res.status(200).send(updated_data)
//     } catch (error) {
//         res.status(400).send(new Error('something went Wrong!!'))
//     }
// }

const postmessage=async(req,res)=>{
    const data=req.body;
    try {
        const inserted_msg=await Chat_modal.update({_id:data.Room_id},{$push:{Messages:data.message}})
        const all_messages=await Chat_modal.findById(data.Room_id,{Messages:{$slice:-limited}});
        process.message(all_messages)
        res.status(200).json({Data:inserted_msg})
        
    } catch (error) {
        res.status(400).send(new Error('something went Wrong!!'));
    }
}

const get_messages=async(req,res)=>{
    const {id}=req.params;
    try {
        const all_messages=await Chat_modal.findById(id,{Messages:{$slice:-20}});
    res.status(200).json({Data:all_messages})
    } catch (error) {
        res.status(400).send(new Error('something went Wrong!!'));
    }
    }

const getbylimit=async(req,res)=>{
    const {id,limit}=req.params;
    limited=limit;
    try {
        const limitedmessages=await Chat_modal.findById(id,{Messages:{$slice:-limit}})
        res.status(200).json({messages:limitedmessages})
    } catch (error) {
        res.status(400).send(new Error('something went Wrong!!'));
    }
}

module.exports={
    createRoom,
    updateroom,exitroom,getall,postmessage,get_messages,getbylimit
}