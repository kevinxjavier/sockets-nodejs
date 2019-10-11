const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

/* 
    Esto lo usaremos para la comunicacion con el backend en el frontend index.html var socket = io(); 
    estos objetos tanto el back como en el front es el mismo en contenido y nombre (o casi igual).
*/
let io = socketIO(server);
// Forma1
//module.exports = io;
// Forma2
module.exports.io = socketIO(server);

require('./sockets/socket');

server.listen(port, (err) => {
    if (err) 
        throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});
