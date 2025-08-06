const express = require('express');
const app = express();
const http = require("http");
const socketio = require('socket.io');
const path = require('path');
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));

// Define routes OUTSIDE of io.on("connection")
app.get('/', function(req, res){
    res.render("index");
});

io.on("connection", function(socket){
    socket.on("send location", function(data) {
        io.emit("received location", { id: socket.id, ...data });
    });
    socket.on("disconnect", function () {
        io.emit("user disconnected",socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});