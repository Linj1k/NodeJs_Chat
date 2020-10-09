$(document).ready(function() {
    var myID = null;
    var socket = io('ChangeMe_ServerLink');

    //Users System
    socket.on('isConnect', function(){
        document.getElementsByClassName('users')[0].innerHTML = '';
        document.getElementById('chat').innerHTML = '';
        $('#sendinput').hide();
        $('#sendpseudo').show();

        let data = {};
        data.time = Date.now();
        let newuser = {}
        newuser.pseudo = "Connect"
        newuser.avatar = 'https://api.adorable.io/avatars/50/connect.png';
        data['user'] = newuser;
        data['message'] = "Merci de remplir le champs pour continuer !";
        
        addUser(newuser);
        addMessage(data);
    });

    $('#sendpseudo').keypress(function(event) {
        if(event.which == 13){
            socket.emit('login', $(this).val());
            $(this).val("");
        }
    });

    socket.on('login', function(data){
        document.getElementsByClassName('users')[0].innerHTML = '';
        document.getElementById('chat').innerHTML = '';
        $('#sendpseudo').hide();
        $('#sendinput').show();
        myID = data.pseudo;
    });

    
    function addUser(data){
        let li = document.createElement('li');
        li.id = data.pseudo;
        if(myID == data.pseudo){
            li.classList.add("owner");
        } else {
            li.classList.add("other");
        }

        //Avatar
        let avatar = document.createElement('img');
        avatar.src = data.avatar;
        avatar.alt = data.pseudo+" Avatar";
        li.append(avatar);

        //Username
        let username = document.createElement('p');
        username.classList.add('pseudo');
        username.innerHTML = data.pseudo;

        li.append(username);

        document.getElementsByClassName('users')[0].appendChild(li);
    }

    function removeUser(data){
        $('#'+data.pseudo).remove();
    }

    socket.on('chat addUser', function(data){
        if(myID != null){
            if(data.pseudo != null){
                addUser(data)
            }
        }
    });

    socket.on('chat removeUser', function(data){
        if(myID != null){
            if(data.pseudo != null){
                removeUser(data)
            }
        }
    });

    //Chat System
    $('#sendinput').hide();
    $('#sendinput').keypress(function(event) {
        if(event.which == 13){
            socket.emit('chat message', $(this).val());
            $(this).val("");
        }
    });

    function addMessage(data){
        let date_ob = new Date(data.time);
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = ("0" + date_ob.getHours()).slice(-2);
        let minutes =  ("0" + date_ob.getMinutes()).slice(-2);
        let seconds = ("0" + date_ob.getSeconds()).slice(-2);

        let li = document.createElement('li');
        if(myID == data.user.pseudo){
            li.classList.add("owner");
        } else {
            li.classList.add("other");
        }

        //Avatar
        let avatar = document.createElement('img');
        avatar.src = data.user.avatar;
        li.append(avatar);

        //Username
        let username = document.createElement('span');
        username.classList.add('pseudo');
        username.innerHTML = data.user.pseudo;
        //Date
        let time = document.createElement('span');
        time.innerHTML = date+"/"+month+"/"+year+" - "+hours+":"+minutes;
        time.classList.add('date');
        username.append(time);

        li.append(username);

        //Message
        let p = document.createElement('p');
        p.innerHTML = data.message;
        li.append(p);

        //Add message
        document.getElementById('chat').appendChild(li);

        //Scroll to Bottom
        $('#chat').animate({ scrollTop: $('#chat').prop('scrollHeight') }, 100);
    }

    socket.on('chat message', function(data){
        if(myID != null){
            addMessage(data)
        }
    });

    socket.on('chat error', function(data){
        addMessage(data)
    });

    let data = {};
    data.time = Date.now();
    let newuser = {}
    newuser.pseudo = "SERVER"
    newuser.avatar = 'https://api.adorable.io/avatars/50/server.png';
    data['user'] = newuser;
    data['message'] = "Une erreur est survenue !";
    addUser(newuser);
    addMessage(data);
})
