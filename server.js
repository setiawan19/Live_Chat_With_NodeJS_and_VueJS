// var express = require('express');
// var app = express();

// app.get('/', function(req, res){
//     res.send(
//         `<div style="text-align: center">
//         <h1 style="color: red">Congratulations Wan....</h1> 
//         <br/>
//         <h2>Express is Working on IIS Node</h2>
//         </div>
//         `
//     );
//     // res.send('xpress is WorkEing on IIS Node');
// });

// app.listen(process.env.PORT);

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});


http.listen(process.env.PORT, () => {
    console.log('Listening on port *: 3000');
});

io.on('connection', (socket) => {

    socket.emit('connections', Object.keys(io.sockets.connected).length);

    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });

    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', (data));
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', (data));
    });

    socket.on('stopTyping', () => {
        socket.broadcast.emit('stopTyping');
    });

    socket.on('joined', (data) => {
        socket.broadcast.emit('joined', (data));
    });

    socket.on('leave', (data) => {
        socket.broadcast.emit('leave', (data));
    });

});