
 const edit_middle=async(req,res,next)=>{
    const {authorization}=req.headers
    const {User_id}=req.body;
    if(authorization===User_id)next()
    else res.status(400).send(new Error('You are not having Permission to edit!!'))
}

module.exports={
    edit_middle
}