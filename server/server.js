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

/*
    - En el HTML, se ejecuta socket.on('connect'), socket.on('disconnect') 
        y socket.on('mensaje') así no se haya refrescado la página. "Hay 
        que refrescar para que se ejecuten los socket.emit('mensaje')".

    - En NodeJS, se ejecutan io.on('connection'), cliente.on('disconnect'),
        cliente.emit('mensaje') y cliente.on('mensaje') si ya un cliente envía info.
*/
io.on('connection', (cliente) => {
    console.log('Cliente conectado...');

    // on() para Recibir Informacion
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado...');
    });

    cliente.on('miMensaje1', (mensaje, callback) => {
        console.log(mensaje);
        callback('Server Respondiendo: se recibio mensaje del Cliente exitosamente...');
    });

    cliente.on('usuario', (mensaje) => {
        console.log(mensaje);
    });

    // emmit() para Enviar Informacion
    cliente.emit('usuario', {usuario: 'administrador', mensaje: 'Welcome'});
})

server.listen(port, (err) => {
    if (err) 
        throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});
