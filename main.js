const { exec } = require("child_process");
const http = require("http")
const express = require("express");
const fs = require("fs");
const CP = require('child_process');
const readlineSync = require('readline-sync');
const socketio = require("socket.io")

const app = express();

app.use(express.static("public"))

const html = fs.readFileSync("./index.html");

app.get("/",(req,res)=>{
    res.write(html);
    res.end()
})

console.log("このソフトではsoftalkフォルダ内のsoftalkw.exeを使用します。")
let priset = readlineSync.question("使用するプリセット名を入力してください\n>");

const command = (text)=>{
    return `wine softalk/softalkw.exe /PR:${priset} /X:1 /W:${text}`
}

const read =(text)=>{
    CP.exec(command(text),(err,stdout,stderr)=>{
        if (err) {
            console.log(`err: ${stderr}`)
            process.exit(100);
        }
    })
}

var server = http.createServer(app);

var io = socketio(server);
io.on('connection', function(socket){
    socket.on("speak",(msg)=>{
        console.log(msg)
        read(msg)
    })
});


server.listen(8000,()=>{
    read("プログラムを開始します");
})



