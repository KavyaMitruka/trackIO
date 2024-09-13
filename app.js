const express = require('express');
const app = express();
const path = require("path");
//setup socket.io
const http = require("http"); //socket io runs on https server

const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

//setup ejs
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("receive-location", {id: socket.id, ...data});
    });
    
    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id);
    })


})

//
app.get("/",function(req,res){
    res.render("index");
});

server.listen(3000)