const fs = require("fs");

const file = __dirname + "/memory.json";


function loadMemory(){

    if(!fs.existsSync(file)){
        fs.writeFileSync(file, JSON.stringify([]));
    }

    return JSON.parse(fs.readFileSync(file));
}



function saveChat(user, ai){

    const memory = loadMemory();

    memory.push({
        user: user,
        ai: ai,
        time: new Date().toISOString()
    });


    // sirf last 100 chats save hongi
    if(memory.length > 100){
        memory.shift();
    }


    fs.writeFileSync(
        file,
        JSON.stringify(memory, null, 2)
    );

}



function getMemory(){

    return loadMemory();

}



module.exports = {
    saveChat,
    getMemory
};
