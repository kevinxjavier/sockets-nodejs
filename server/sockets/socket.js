// Forma 1
//const io = require('../server');
// Forma 2
const { io } = require('../server');

/*
    - En el HTML, se ejecuta socket.on('connect'), socket.on('disconnect') 
        y socket.on('mensaje') así no se haya refrescado la página. "Hay 
        que refrescar 
        para que se ejecuten los socket.emit('mensaje')".
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
        callback('Server Respondiendo: se recibio mensaje del Cliente exitosamente...');    // Devolviendo respuesta a Cliente
    });

    cliente.on('usuario', (mensaje) => {
        console.log(mensaje);
    });

    // emmit() para Enviar Informacion
    cliente.emit('usuario', {usuario: 'administrador', mensaje: 'Welcome'});
});
