const User_modal=require('../modals/auth')
const bcrypt=require('bcrypt')
const Room_modal=require('../modals/Room')
const jwt=require('jsonwebtoken');
 const Login=async(req,res)=>{
    try {
        const {Email,Password} =req.body;
        const existing_user=await User_modal.findOne({Email})
        if(!existing_user) return res.status(400).json({error:"User Not Present!!"})
        const exisiting_pass=await bcrypt.compare(Password,existing_user.Password);
        if(!exisiting_pass) return res.status(200).send({error:"Invalid Credentials!!"})
        const token=jwt.sign({Email,id:existing_user.id},'test',{expiresIn:"1h"})
        res.status(200).json({user:existing_user,token})
    } catch (error) {
        res.status(400).json({error:"some Error occured!!"})
    }
}

 const Signup=async(req,res)=>{
    const {Email,Password,Name,Image}=req.body;
    const Exisiting_user=await User_modal.findOne({Email})
    if(Exisiting_user) return res.status(400).json({error:'User already exists!!'})
    const google_user=await User_modal.findOne({Email,Password:""})
    if(google_user) return res.status(400).send({error:"Email already present with Google.Try to login with google"})
    try {
        const encrypted_pass=await bcrypt.hash(Password,12);
        const New_user=new User_modal({Email,Password:encrypted_pass,Name,Image})
        await New_user.save()
        const token=jwt.sign({Email,id:New_user.id},'test',{expiresIn:"1h"})
        const updated_room=await Room_modal.update({_id:"60fa5bed8f77dc5dd017f5ed"},{$push:{Members:New_user}})
        res.status(200).json({user:New_user,token})
    } catch (error) {
        res.status(400).json({error:"something went wrong!!"})
    }
}

const googlelogin=async(req,res)=>{
    const {email,name,imageUrl}=req.body
    const existing_user=await User_modal.findOne({Email:email,Password:""})
    if(existing_user) return res.status(200).json({user:existing_user})
    const already_exist=await User_modal.findOne({Email:email})
    if(already_exist)return res.status(400).json({error:"User already exists!!"})
    const new_user=new User_modal({Email:email,Name:name,Image:imageUrl,Password:""})
    const updated_room=await Room_modal.update({_id:"60fa5bed8f77dc5dd017f5ed"},{$push:{Members:new_user}})
    await new_user.save()
    res.status(200).json({user:new_user})
}


const getUsers=async(req,res)=>{
    try {
        const all_users=await User_modal.find()
        res.status(200).json({users:all_users})
    } catch (error) {
        res.status(400).json({error:"something went wrong!!"})
    }
}

module.exports={
    Login,Signup,getUsers,
    googlelogin
}