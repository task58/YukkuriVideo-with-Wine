const fs = require("fs");

// コンフィグをチェックするための関数

module.exports = function checkConfig(config){
    console.log("コンフィグをチェック中...")
    if(!config.SofTalkDir){
        console.error("コンフィグ SofTalkDir の値が空か、プロパティが存在していません")
        process.exit(2);
    }
    try {
        fs.accessSync(config.SofTalkDir)
    } catch (error) {
       
        if(error.code = "ENOENT"){
            console.error("コンフィグ SofTalkDir で指定されたディレクトリが存在しません")
        }else{
            console.error(error)
        }
        process.exit(2)
    }
    console.log("チェック完了")
}

