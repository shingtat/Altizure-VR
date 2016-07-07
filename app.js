var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//Allows content to be accessed from the following directories
app.use('/js', express.static(__dirname + '/js'));
app.use('/models', express.static(__dirname + '/models'));
app.use('/build', express.static(__dirname + '/build'));

serv.listen(2000);
console.log("Server started.");

//Sets up socket connection.
var io = require('socket.io')(serv,{});
io.sockets.on('connection', function (socket) {
    socket.on('relay', function (data) {
        socket.broadcast.emit('relaying', {x: data.x, y: data.y, z: data.z});
    });
});

