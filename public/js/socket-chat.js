// IO = esta es la comunicacion del backend
var socket = io();

// $ curl http://localhost:3000/chat.html?nombre=kevin&sala=juegos
var params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('Nombre y Sala son necesarios');    
}

var nombre = params.get('nombre');
var sala = params.get('sala');

// Escucha al servidor
socket.on('connect', function() {
    console.log('Conectado al servidor');

    // Envia al servidor
    socket.emit('entrarChat', {nombre, sala}, function(res) {        
        miID = res.mensaje;        
        renderizarUsuarios(res.usuarios);
        console.log('sc-log-23: ' + JSON.stringify(res));
    });
});

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('listaUsuarios', function(res) {    
    renderizarUsuarios(res.usuarios);
    renderizarMensajes(res, false, false);
    scrollBottom();
    console.log('sc-log-35: ' + JSON.stringify(res));
});

// Se puede ejecutar esto directamente en la consola del navegador: socket.emit('enviarMensaje', 'Hola');
socket.on('recibirMensajePublico', function(res) {
    renderizarMensajes(res, false, false);
    scrollBottom();
    console.log('sc-log-42: ' + JSON.stringify(res));
});

// Se puede ejecutar esto directamente en la consola del navegador: socket.emit('recibirMensajePrivado', {id: '464dsfds', mensaje: 'Hola'});
socket.on('recibirMensajePrivado', function(res) {    
    renderizarMensajes(res, false, true);
    scrollBottom();
    console.log('sc-log-49: ' + JSON.stringify(res));
});
