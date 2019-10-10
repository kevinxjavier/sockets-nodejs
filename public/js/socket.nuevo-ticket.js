// Estableciendo la conexion con el Socket
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al Servidor...');
});

socket.on('disconnect', function() {
    console.log('Desconectado del Servidor...');
});

/* JQuery ejecutar todos los botones en el evento de click <button>. 
 * Si el <button id="exec1"> podemos especificar el boton a ejecutar a traves del id
 * con $('#exec1').on('click', function() {
 */
$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        //document.getElementById('lblNuevoTicket').innerHTML = siguienteTicket;
        label.text(siguienteTicket)
    });
});
