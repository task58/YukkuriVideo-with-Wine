const http = require("http");//音声認識サイドのサーバーを建てる用
const express = require("express");//音声認識サイドのサーバーを建てる用
const fs = require("fs");//config.yaml読み込み用
const CP = require('child_process');//softalk起動用
const readlineSync = require('readline-sync');//操作用
const socketio = require("socket.io")//音声認識サイドとの連携用
const yaml = require("js-yaml");//config.yaml読み込み用
const configChacker = require("./lib/configChecker");//config.yamlがちゃんとしてるか調べる関数
const path = require("path");
const os = require("os");
const crypto = require("crypto"); //ハッシュ値生成用

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