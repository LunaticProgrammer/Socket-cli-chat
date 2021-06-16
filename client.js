var socket = require('socket.io-client')('http://localhost:3000');
const repl = require('repl');

const chalk = require('chalk');

var username = null;

socket.on('disconnect', ()=>{

    socket.emit('disconnected')
})

socket.on('connect',()=>{

    console.log(chalk.red("=== start chatting ==="));

    username = process.argv[2]

    socket.emit('privatechat',{username:username});


});

socket.on('message',(data)=>{
    const {cmd, username} = data

    console.log(chalk.green(username+": "+ cmd.split('\n')[0]));

})

socket.on('res',(data)=>{

    console.log(data.mes);
})

socket.on('res2',(data)=>{

    console.log(data.mes)
})

socket.on('error',(data)=>{

    console.log(`some error occured ${data.mes}`)
})

socket.on('stderr',(data)=>{

    console.log(`some stderr error occured ${data.mes}`)
})

socket.on('stdout',(data)=>{

    console.log(`The output for command is  ${data.mes}`)
})

socket.on('test',(data)=>{

    console.log(data)
})



 const replServer = repl.start({
    prompt:'',
    eval: (cmd)=>{

            socket.send({cmd, username})
        
    }
})

replServer.defineCommand('privatemess',{
    action:(name)=>{
        socket.emit('privatemess',{mes:name.split(' ').splice(0,name.split(' ').length-1), username:username, priority: name.split(' ')[name.split(' ').length-1]})
    }
})

replServer.defineCommand('privatecommand',{
    action:(name)=>{
        socket.emit('privatecommand',{command:name.split(' ').splice(0,name.split(' ').length-1).join(' '), username:username,priority:name.split(' ')[name.split(' ').length-1] })
    }
})
