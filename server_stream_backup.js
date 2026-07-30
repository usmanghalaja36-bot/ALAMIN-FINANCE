const express = require("express");
const cors = require("cors");
require("dotenv").config();

const Groq = require("groq-sdk");
const memory = require("./memory");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;


const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
});



app.post("/chat", async (req, res) => {

    try {

        const message = req.body.message;


        const oldMemory = memory.getMemory()
            .slice(-5)
            .map(chat =>
                `User: ${chat.user}\nAI: ${chat.ai}`
            )
            .join("\n\n");



        const completion = await client.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages: [

                {
                    role: "system",
                    content: `
You are ALAMIN AI.

You are a friendly, intelligent and helpful AI assistant.

Personality:
- Talk naturally like a smart assistant.
- Be polite, patient and supportive.
- Understand the user's tone.
- User may speak Urdu, Roman Urdu or English. Reply in the same style.
- Explain things step by step.
- Help users learn and create.

Emotional intelligence:
- Understand when a user is confused, happy or frustrated.
- Respond with kindness and encouragement.
- Do not pretend to have real human emotions.

Safety:
- Do not help with harmful, illegal or dangerous activities.
- If something is unsafe, refuse politely and suggest a safe option.
- Be honest if you do not know something.

Memory:
Use previous conversation context when available.

Previous conversation:
${oldMemory}

Your goal:
Be a useful, safe and friendly AI assistant.
`
                },


                {
                    role:"user",
                    content:message
                }

            ]

        });



        const reply =
        completion.choices[0].message.content;



        memory.saveChat(message, reply);



        res.json({

            reply:reply

        });



    } catch(error) {


        console.log(error);


        res.status(500).json({

            reply:"Sorry, ALAMIN AI is having a connection problem."

        });


    }


});




app.listen(PORT, ()=>{

    console.log("ALAMIN AI server running 🚀");

});
