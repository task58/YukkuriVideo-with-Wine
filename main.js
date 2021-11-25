const { exec } = require("child_process");
const express = require("express");
const fs = require("fs");
const CP = require('child_process');
const readlineSync = require('readline-sync');

const app = express();

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

app.listen(8000,()=>{
    read("プログラムを開始します");
})
