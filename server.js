const app = require('express')();
var server = require('http').createServer(app)
const io = require('socket.io')(server);
const {MinPriorityQueue} = require('vanilla-priority-queue')
const {exec} = require('child_process');

let pq =  new MinPriorityQueue();

const port = 3000;


server.listen(port,()=>{
    
    console.log(`app listening on port ${port}`);
});

io.on('connection',(socket)=>{

    console.log(`connected ${socket.id}`);

    socket.on('message',(evt)=>{
        console.log(evt)
        socket.broadcast.emit('message',evt);
    })

    socket.on('privatechat',(data)=>{
        socket.join(data.username);
        io.sockets.in(data.username).emit('res',{mes:'youre added!'});
    })

    socket.on('privatemess',(data)=>{
        pq.insert({mes:data.mes,user:data.username},data.priority);

            let d = pq.remove();
            let name = d.user
            let message = d.mes
            io.sockets.in(name).emit('res2',{mes:`we recieved your message ${message.join(' ')}`})
            socket.broadcast.emit('test',message);
    })

    
    /*
        
        
    */

    socket.on('privatecommand',(data)=>{

        const command = data.command;
        exec(command,(error,stdout,stderr)=>{

            if(error){

                socket.emit('error',{mes:error})
            }

            if(stderr){

                socket.emit('stderr',{mes:stderr})
            }

            if(stdout){
                socket.emit('stdout',{mes:stdout})
            }
        })
    })

})



io.on('disconnect',(evt)=>{

    console.log(`some left`)
})