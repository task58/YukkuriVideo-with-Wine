SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const recognition = new SpeechRecognition();
const button = document.getElementById("rec");
const text = document.getElementById("text");
const socket = io();

console.log(io)

recognition.lang = "ja-JP"

recognition.onresult = (event) => {
    var res = event.results[0][0].transcript;
    socket.emit("speak",res)
    console.log(res)
    var old = text.innerText;
    text.innerText =  res + "\n" + old
}

recognition.onend = ()=>{
    recognition.start()
}
    
button.addEventListener("click",()=>{
    recognition.start()
})