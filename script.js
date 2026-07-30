const chat = document.getElementById("chat");
const input = document.getElementById("message");
const typing = document.getElementById("typing");


function addMessage(text, type){

    const div = document.createElement("div");

    div.className = "message " + type;

    div.innerText = text;

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;

}



function showTyping(){

    typing.style.display = "flex";
    chat.appendChild(typing);

}



function hideTyping(){

    typing.style.display = "none";

}



async function sendMessage(){

    const message = input.value.trim();


    if(!message) return;


    addMessage(message,"user");

    input.value="";


    showTyping();


    try{


        const response = await fetch(
            "http://localhost:3000/chat",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    message:message
                })
            }
        );



        hideTyping();



        const div = document.createElement("div");

        div.className="message ai";

        chat.appendChild(div);



        const reader = response.body.getReader();

        const decoder = new TextDecoder();



        while(true){


            const {done,value}=await reader.read();


            if(done) break;


            const text = decoder.decode(value);


            div.innerText += text;


            chat.scrollTop = chat.scrollHeight;


        }



    }
    catch(error){


        hideTyping();


        addMessage(
            "⚠️ Connection error",
            "ai"
        );


        console.log(error);

    }

}




input.addEventListener(
"keypress",
function(e){

    if(e.key==="Enter"){

        sendMessage();

    }

});
