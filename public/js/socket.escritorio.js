// Estableciendo la conexion con el Socket
var socket = io();

var params = new URLSearchParams(window.location.search);   // Esto trae los parametros del GET, Esto no funciona en Internet Explorer o Edge

if (!params.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

let escritorio = params.get('escritorio');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio }, function(res) {
        $('small').text('Tikect ' + res);
    });
});

