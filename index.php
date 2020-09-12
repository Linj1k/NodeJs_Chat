<!DOCTYPE html>
<html>
  <head lang="fr">
    <meta charset="UTF-8">
    <title>Chat</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/82c3a4109a.js" crossorigin="anonymous" alt="Font Awesome"></script>
    <link rel="stylesheet" type="text/css" href="https://enzolefevres.fr/css/app.css">
    <link rel="stylesheet" type="text/css" href="app.css">
    <link rel="icon" href="favicon.ico" />
  </head>
  <body>
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <h1>Chat</h1>

      <main role="main" class="inner cover main" style="display: contents; margin-bottom: 5px;">
        <div class="userscontainer">
          <ul class="users text-center">
          </ul>
        </div>

        <div class="chatcontainer">
          <div class="chats">
            <ul id="chat"></ul>
            <div class="chat">
              <input id="sendpseudo" type="text" placeholder="Entrer un pseudo" style="border: solid;">
              <input id="sendinput" type="text" placeholder="Entrer un message">
            </div>
          </div>
        </div>
      </main>

      <p>Powered By <a href="https://socket.io/">Socket.io</a>, Enzo Lefevres - Copyright ©2020</p>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js"></script>
    <script src="app.js"></script>
  </body>
</html>
