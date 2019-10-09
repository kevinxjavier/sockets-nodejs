/*
    - En el HTML, se ejecuta socket.on('connect'), socket.on('disconnect') 
        y socket.on('mensaje') así no se haya refrescado la página. "Hay 
        que refrescar para que se ejecuten los socket.emit('mensaje')".
    - En NodeJS, se ejecutan io.on('connection'), cliente.on('disconnect'),
        cliente.emit('mensaje') y cliente.on('mensaje').
*/
var socket = io();

// on() para Recibir Informacion
socket.on('connect', function() {
    console.log('Conectado al Servidor...');
});

socket.on('disconnect', function() {
    console.log('Perdimos coneccion con el Servidor...');
});

socket.on('usuario', function(mensaje) {
    console.log(mensaje);
});

// emmit() para Enviar Informacion
socket.emit('usuario', {usuario: 'kevinxjavier', mensaje: 'Hola'});

socket.emit('miMensaje1', 'Saludos desde el Cliente', function(res) {
    console.log(res);
});
