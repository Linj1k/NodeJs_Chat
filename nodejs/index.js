const https = require('https');
const fs = require('fs');
const socketio = require('socket.io');

server = https.createServer({
    key: fs.readFileSync('private.key'),
    cert: fs.readFileSync('certificate.crt')
});
io = socketio(server),

server.listen(3000, () => console.log(`Server running on 3000`));

const users = [];

function createMessage(pseudo, message){
    return {
        time: Date.now(),
        user: {
            pseudo: pseudo,
            avatar: "https://api.adorable.io/avatars/50/"+pseudo+".png"
        },
        message: message
    };
}

function createUser(id, pseudo){
    const user = {
        id: id,
        pseudo: pseudo,
        avatar: "https://api.adorable.io/avatars/50/"+pseudo+".png"
    };
    users.push(user);
    return user;
}

function removeUser(id){
    users.splice(getUserIndex(id), 1)[0];
}

function getUser(id){
    return users.find(user => user.id === id);
}

function getUserIndex(id){
    return users.findIndex(user => user.id === id);
}

function findUserPseudo(pseudo){
    var canContinue = true;
    var i;
    for (i = 0; i < users.length; i++) {
        if(users[i].pseudo == pseudo){
            canContinue = false;
            break;
        }
    }
    return canContinue;
}

io.on('connection', function(socket){
    socket.emit("isConnect");

    socket.on('login', function(pseudo){
        var canContinue = findUserPseudo(pseudo);
        
        if(canContinue){
            user = createUser(socket.id, pseudo);
            console.log(pseudo+" a user is connect");
            socket.emit("login", user);
            
            io.emit('chat addUser', user);
    
            var i;
            for (i = 0; i < users.length; i++) {
                if(users[i] != user){
                    socket.emit("chat addUser", users[i]);
                }
            }
        } else {
            socket.emit("chat error", createMessage("SERVER", "Ce pseudo est déjà utiliser !"));
        }
    })

    socket.on('disconnect', function(){
        const user = getUser(socket.id);

        if(user !== null){
            removeUser(socket.id);
            console.log("a user is disconnected");
            io.emit('chat removeUser', user);
        }
    })

    socket.on('chat message', function(message){
        const user = getUser(socket.id);

        io.emit("chat message", createMessage(user.pseudo, message));
    })
})