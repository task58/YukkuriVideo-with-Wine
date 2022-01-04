const { exec } = require("child_process");
const http = require("http")
const express = require("express");
const fs = require("fs");
const CP = require('child_process');
const readlineSync = require('readline-sync');
const socketio = require("socket.io")
const yaml = require("js-yaml");
const configChacker = require("./lib/configChecker");
const path = require("path");
const os = require("os");

const name = os.userInfo().username;
const homeDir = os.userInfo().homedir
const appDir = path.posix.join(homeDir,".wine","drive_c","users",name,"YukkuriVoiceW")

// var appDirWinA = path.win32.join("c:","users",name,"YukkuriVoiceW");
// var appDirWinB = appDirWinA.split("\\")
// const app DirWin = appDirWinB.join("\\\\")
//を1行で済ませる
const appDirWin = path.win32.join("c:","users",name,"YukkuriVoiceW").split("\\").join("\\\\")

console.log(appDirWin)

try {
    fs.accessSync(appDir)
} catch (error) {
   
    if(error.code = "ENOENT"){
        console.error("アプリケーションフォルダが存在しません")
        console.log(appDir+"にフォルダを作成します")
        fs.mkdirSync(appDir)
        fs.mkdirSync(appDir+"/record")
        console.log(homeDir+"にショートカットを作成します")
        CP.execSync("ln -s "+appDir+" "+homeDir)
    }else{
        console.error(error)
        process.exit(2)
    }
}

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

let rec = readlineSync.question("音声を録音しますか？\n録音するなら0を入力\n>");
let recbool = false;
if(parseInt(rec) == 0){
    recbool = true;
}

let recCount = 0;

const command = (text,rec)=>{
    if(rec){
        return `wine start ${config.SofTalkDir}/softalkw.exe /PR:${priset} /X:1 /R:${appDirWin}\\\\record\\\\rec_${recCount}_.wav /W:${text}`
    }else{
        return `wine start ${config.SofTalkDir}/softalkw.exe /PR:${priset} /X:1 /W:${text}`
    }
}

const read =(text,rec)=>{
    CP.exec(command(text,rec),(err,stdout,stderr)=>{
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
        read(msg,recbool)
    })
});


server.listen(8000,()=>{
    console.log("server start!")
    if (recbool) {
        console.log("録音モード")
    }
    read("プログラムを開始します",false);
})