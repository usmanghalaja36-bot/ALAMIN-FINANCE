require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();

app.use(cors());
app.use(express.json());


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});


const knowledge = {

"pakistan": "Pakistan ka capital Islamabad hai 🇵🇰",

"india": "India ka capital New Delhi hai 🇮🇳",

"earth": "Earth hamara planet hai 🌍",

"ai": "AI ka matlab Artificial Intelligence hai 🤖",

"computer": "Computer ek electronic machine hai 💻",

"internet": "Internet duniya bhar ka network hai 🌐"

};


app.post("/chat", async (req,res)=>{

let userMessage = req.body.message;

let message = userMessage.toLowerCase().trim();

try {


let reply = "";


if(message.includes("hello") || message.includes("hi") || message.includes("salam")){

reply = "Hello 👋 Main ALAMIN AI hoon. Kaise madad kar sakta hoon?";

}


else if(message.includes("who are you") || message.includes("tum kon ho")){

reply = "Main ALAMIN AI hoon 🤖 tumhara smart assistant.";

}


else if(knowledge[message]){

reply = knowledge[message];

}


else {


const response = await groq.chat.completions.create({

model: "llama-3.1-8b-instant",

messages:[
{
role:"user",
content:userMessage
}
]

});


reply = response.choices[0].message.content;


}


res.json({
reply: reply
});


}
catch(error){

console.log("ERROR:", error);

res.json({
reply:error.message
});

}




});


app.listen(3000,()=>{

console.log("ALAMIN AI server running 🚀");

});
