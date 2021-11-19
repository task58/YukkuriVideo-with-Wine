const express = require("express");
const fs = require("fs");

const app = express();

const html = fs.readFileSync("./index.html");

app.get("/",(req,res)=>{
    res.write(html);
    res.end()
})

app.listen(8000,()=>{
    console.log("start!")
})