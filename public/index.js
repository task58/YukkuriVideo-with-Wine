SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const recognition = new SpeechRecognition();
const record = document.getElementById("recon");
// const recstop = document.getElementById("recstop");
const text = document.getElementById("text");
const socket = io();

recognition.lang = "ja-JP"

recognition.onresult = (event) => {
    var res = event.results[0][0].transcript;
    socket.emit("speak",res)
    console.log(res)
    var old = text.innerText;
    text.innerText =  res + "\n" + old
}

recognition.onend = ()=>{
    if(!record.checked)return;
    recognition.start()
}

record.addEventListener("click",()=>{
    recognition.start();
})