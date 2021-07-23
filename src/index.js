const express=require('express')
const socket=require('socket.io')
const mongoose=require('mongoose')
const Post=require('./Routes/todo')
const auth=require('./Routes/auth')
const Chat=require('./Routes/chat')
const http=require('http')
const app=express()
const cors=require('cors')
app.use(cors())
app.use(express.json({extended:true,limit:"100kb"}))
app.use(express.urlencoded({extended:true,limit:"100kb"}))

app.use('/',Post)
app.use('/',auth)
app.use('/chat',Chat)


const port=process.env.PORT||4000;
const server=http.createServer(app)
app.get('/',(re,res)=>{
    res.send('hello')
})
// const data=['apple','orange','mango','pear','Grapes'];
 const io=socket(server);
// let index=0;

//Array with users
let users=[]

const append_user=(socket_id,user_id)=>{
        let flag=0;
        for(let i of users){
            if(i.user_id===user_id){
                flag=1;
                break;
            }
        }
        if(flag==0)users.push({socket_id,user_id})
}

const leaveuser=(socket_id)=>{
    const new_users=users.filter((each)=>{
        return each.socket_id!==socket_id
    })
    users=[...new_users];
}

const check_user=(user_id)=>{
    for(let i of users){
        if(i.user_id===user_id)return true;
    }
    return false;
}
const returnusers=(members)=>{
        const status=[]
        for(let i of members){
            if(check_user(i._id))status.push({member:i,status:"online"})
            else status.push({member:i,status:"offline"})
        }
        return status
}
io.on('connection',(socket)=>{
    console.log('I am connecyed client')
    socket.on('NewUser',(user_id)=>{
        append_user(socket.id,user_id);        
    })
    socket.on('userstatus',(all_members)=>{
        io.emit('status_user',returnusers(all_members));
    })
    socket.on('disconnect',()=>{
        leaveuser(socket.id)
    })
    
})

process.e=(data)=>{
    io.emit('message',data)
}
process.chat=(data)=>{
    io.emit('Rooms',data)
}
process.message=(data)=>{
    io.emit('All_messages',data);
}




mongoose.connect(`mongodb+srv://bebinjohn28:Bebinjohn2001@cluster0.uyv79.mongodb.net/todo-app?retryWrites=true&w=majority`,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false}).then(()=>{
    server.listen(port,()=>{
        console.log('I am workign!!')
    })
}).catch((error)=>console.log(error))