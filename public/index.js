SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
        const recognition = new SpeechRecognition();
        const button = document.getElementById("rec");
        const text = document.getElementById("text");

        recognition.onresult = (event) => {
            var res = event.results[0][0].transcript;
            console.log(res)
            var old = text.innerText;
            text.innerText = old + res + "\n"
        }

        recognition.onend = ()=>{
            recognition.start()
        }
    
        button.addEventListener("click",()=>{
            recognition.start()
        })