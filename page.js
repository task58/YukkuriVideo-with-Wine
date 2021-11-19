SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const recognition = new SpeechRecognition();
const button = document.getElementById("rec")

recognition.onresult = (event) => {
    console.log(event.results[0][0].transcript)
    recognition.start();
}
