
/*--------------------------------------------------------------*/
/*---------------------------VARIABLES--------------------------*/
/*--------------------------------------------------------------*/
let http = require('http');
let fs = require('fs');
let app = require('express')();

let cpt_player = 0;

app.get('/', function (req, res) {
    res.sendFile( __dirname + '/main.html');
});

let server = require('http').Server(app);
//Loading the main page of the game
/*let server = http.createServer(function(req, res) {
    if(req.url != "./client.js"){
        fs.readFile('./main.html', 'utf-8', function(error, content) {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(content);
        });
    }
});
*/
//Loading socket.io
let io = require('socket.io').listen(server);

/*--------------------------------------------------------------*/
/*---------------------------MESSAGES---------------------------*/
/*--------------------------------------------------------------*/
//When a client log in we print it in the console
io.on('connection', function (socket) {
    console.log('Un client est connecté !');

    socket.on("new_player", function(){
        console.log('new player !');
        if(cpt_player < 2){
            socket.emit("connection accepted");
            cpt_player += 1;
        }
        if (cpt_player > 1){
            io.emit("play_begin");
            console.log('let s being !');
        }
    });

    socket.on("end", function(){
        io.emit("end_game");
        cpt_player = 0;
        console.log('game over');
    });
});

server.listen(8080);