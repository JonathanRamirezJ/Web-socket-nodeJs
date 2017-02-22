var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var arrmessages = [{
  id: 1,
  text: 'Hola soy un mensaje',
  author: 'Jonathan Ramirez'
}];

app.use(express.static('public'));

app.get('/',function(req, res){
  res.status(200).send("Servidor iniciando");
});

io.on('connection', function(socket){
  console.log('Alguien se ha conectado');

  socket.emit('messages', arrmessages);

  socket.on('new-message',function (data) {
    arrmessages.push(data);

    io.sockets.emit('messages', arrmessages);
  });
});


server.listen(8080,function() {
  console.log('Servidor corriendo en : http://localhots:8080/');
});
