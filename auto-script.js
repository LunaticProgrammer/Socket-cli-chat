let {exec} = require('child_process');

exec('usr/bin/node script.js',(error,stdout,stderr)=>{

    if(stdout){
        console.log(stdout)
    }else{

        console.log(error);
        console.log(stderr);
    }
})

for(x=0;x<20;x++){

    exec(`node client.js client${x}`,(error,stdout,stderr)=>{

        if(stdout){
            console.log(stdout)
        }else{
    
            console.log(error);
            console.log(stderr);
        }
    })
}
