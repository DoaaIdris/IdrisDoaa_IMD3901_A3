const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT   = 8080;

server.listen(LISTEN_PORT);
app.use(express.static(__dirname + '/public')); //set root path of server ...

console.log("Listening on port: " + LISTEN_PORT );

//our routes
app.get( '/', function( req, res ){ 
    res.sendFile( __dirname + '/public/index.html' );
});

app.get( '/2D', function( req, res ){ 
    res.sendFile( __dirname + '/public/player1.html' );
});

app.get( '/3D', function( req, res ){ 
    res.sendFile( __dirname + '/public/player2.html' );
});

//socket.io stuff
io.on('connection', (socket) => {

    console.log( socket.id + " connected" );

    socket.on('disconnect', () => {
        console.log( socket.id + " disconnected" );
    });

    socket.on("purpleBox1", event => {
        console.log( "change to purple" );
        io.sockets.emit("purple1", {r:255, g:0, b:255});
    });

    socket.on("purpleBox2", event => {
        console.log( "change to purple" );
        io.sockets.emit("purple2", {r:255, g:0, b:255});
    });

    socket.on("redBox", (data) => {
        console.log( "red box added" );
        io.sockets.emit("redBox_added");
    });

    socket.on("blueBox", (data) => {
        console.log( "blue box added" );
        io.sockets.emit("blueBox_added");
    });

    socket.on("changeRed", (data) => {
        console.log( "change to red box" );
        io.sockets.emit("redBox_changed", {r:255, g:0, b:0});
    });

    socket.on("changeBlue", (data) => {
        console.log( "change to blue box" );
        io.sockets.emit("blueBox_changed", {r:0, g:0, b:255});
    });

    socket.on("disableRed", (data) => {
        console.log( "disable red box" );
        io.sockets.emit("redBox_disabled", {r:255, g:100, b:100});
    });

    socket.on("disableBlue", (data) => {
        console.log( "disable blue box" );
        io.sockets.emit("blueBox_disabled", {r:100, g:100, b:255});
    });


    

    //infinite loop with a millisecond delay (but only want one loop running ...)
    //a way to update all clients simulatenously every frame i.e. updating position, rotation ...
    // if (setIntervalFunc == null) {
    //     console.log("setting interval func");
    //     setIntervalFunc = setInterval( () => {
    //         //if we want to do loops 
    //     }, 50);
    // }
});