const { exec } = require("child_process");
const http = require("http")
const express = require("express");
const fs = require("fs");
const CP = require('child_process');
const readlineSync = require('readline-sync');
const socketio = require("socket.io")
const yaml = require("js-yaml");
const configChacker = require("./lib/configChecker")

const app = express();

app.use(express.static("public"))

const html = fs.readFileSync("./index.html");

console.log("コンフィグを読み込み中")
const config = yaml.load(fs.readFileSync("./config.yaml"))

configChacker(config);

app.get("/",(req,res)=>{
    res.write(html);
    res.end()
})

console.log("このソフトではsoftalkフォルダ内のsoftalkw.exeを使用します。")
let priset = readlineSync.question("使用するプリセット名を入力してください\n>");

const command = (text)=>{
    return `wine ${config.SofTalkDir}/softalkw.exe /PR:${priset} /X:1 /W:${text}`
}

const read =(text)=>{
    CP.exec(command(text),(err,stdout,stderr)=>{
        if (err) {
            console.log(`err: ${stderr}`)
            process.exit(1);
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
    console.log("server start!")
    read("プログラムを開始します");
})

// コンフィグをチェックするための関数

function checkConfig(config){
    if(!config.SofTalkDir){
        console.error("コンフィグ SofTalkDir の値が空か、プロパティが存在していません")
        process.exit(2);
    }
    fs.access(config.SofTalkDir,(err)=>{
        if(!err)return;
        if (error.code === "ENOENT") {
            console.error("コンフィグ SofTalkDir に指定されたディレクトリが存在しません")
        } else {
            console.error("予期せぬエラーが発生しました")
        }
        process.exit(2);
    })
}

