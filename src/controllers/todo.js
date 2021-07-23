const e = require('cors');
const Postmodal=require('../modals/Todo')

const Post=async(req,res)=>{
    const data=req.body
    let comp=false;
    if(data.Status==='Completed') comp=true;
    try {
        const Todo=new Postmodal({...data,completed:comp});
        await Todo.save()
        const todos=await Postmodal.find()
        process.e(todos)
         res.status(200).json({title:"Todo Created"});
    } catch (error) {
        res.status(400).json({error:error.message})
    }  
}

const Get_todo=async(req,res)=>{
    try {
        const todos=await Postmodal.find()
        res.status(200).send(todos)
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}

const Update_todo=async(req,res)=>{
    try {
        let comp=false;
        if(req.body.Status==='Completed') comp=true;
        else comp=false;
         const {_id}=req.body;
         const data={...req.body,completed:comp}
         const updated_data=await Postmodal.findByIdAndUpdate(_id,data)
         const todos=await Postmodal.find()
         process.e(todos)
         res.status(200).json({data:updated_data})
    } catch (error) {
        res.status(400).send({error:error.message})
    }

}

const del_post=async(req,res)=>{
    try {
        const {_id}=req.body;
        const deleted_data=await Postmodal.findByIdAndRemove(_id)
        const todos=await Postmodal.find()
        process.e(todos)
        res.status(200).json({deleted:deleted_data})
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}

const NOT=async(req,res)=>{
    const {id}=req.body
    try {
        const all_details=await Postmodal.find()
        let count=0;
        all_details.map((each)=>{
            if(each.completed===false){
            each.Members.map((e)=>{
                if(e['_id']===id){
                    count++;
                }
            })
            }
        })
        // console.log(all_details)
        // console.log(count)
        res.status(200).json({count:count});
    } catch (error) {
        res.status(400).send(new Error('error!!'))
    }
}
module.exports={
    Post,Get_todo,Update_todo,del_post,NOT
}