// No la necesito porque el archivo socket-chat.js se importa abajo del import de este archivo.
// var params = new URLSearchParams(window.location.search); 

// ===================================================
// Referencias de JQuery
var divUsuarios = $('#divUsuarios');
var frmEnviar = $('#frmEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');

// ===================================================
// Mensaje Privado
var miID = '';
var idusuarioMensajePrivado = '';

// ===================================================
// Funciones para renderizar usuarios

function renderizarUsuarios(usuarios) {

    usuarios = usuarios.filter(u => u.id != miID);

    document.getElementById('sala2').innerHTML = params.get('sala');
    let html = '';
    
    html += '<li>';
    html += '   <a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (let i = 0; i < usuarios.length; i++) {
        html +='<li>';
        html +='    <span id="usuario_mensaje_' + usuarios[i].id + '">*</span><a data-id="' + usuarios[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + usuarios[i].nombre + '<small class="text-success">online</small></span></a>';
        //html +='    <a data-id="' + usuarios[i].id + '" href="javascript:void(0)" onclick=callIDUser("' +usuarios[i].id+ '")><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + usuarios[i].nombre + '<small class="text-success">online</small></span></a>';
        html +='</li>';
    }
    divUsuarios.html(html);
    //document.getElementById('divUsuarios').innerHTML = html;

    for (let i = 0; i < usuarios.length; i++) {
        document.getElementById("usuario_mensaje_" + usuarios[i].id).style.visibility = "hidden";
    }
    
}

function renderizarMensajes(mensaje, yo, mensajePrivado) { 
    let html = '';
    let fecha = new Date(mensaje.fecha);
    let hora = fecha.getHours() + ':' + fecha.getMinutes();

    let adminClass = 'info';
    if(!mensaje.nombre.nombre) { // admin es undefiened
        adminClass = 'danger';
    }

    if (!mensajePrivado || (mensaje.nombre.id === miID || mensaje.usuarios === miID)) {
        if(yo) {            
            html += '<li class="reverse">';
            html += '    <div class="chat-content">';
            html += '        <h5>' + mensaje.nombre.nombre + '</h5>';
            html += '        <div class="box bg-light-inverse">' + mensaje.mensaje+ '</div>';
            html += '    </div>';
            html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
            html += '    <div class="chat-time">' + hora + '</div>';
            html += '</li>';

        } else {
            html += '<li class="animated fadeIn">';
            if(mensaje.nombre.nombre) {
                html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
            }
            html += '    <div class="chat-content">';
            html += '        <h5>' + ((mensaje.nombre.nombre) ? mensaje.nombre.nombre : mensaje.nombre) + '</h5>';
            html += '        <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje+ '</div>';
            html += '    </div>';
            html += '    <div class="chat-time">' + hora + '</div>';
            html += '</li>';
            document.getElementById('usuario_mensaje_' + mensaje.nombre.id).style.visibility = 'visible';
        }
    }
    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// ===================================================
// Listener JQuery, cuando hagamos click en divUsuarios dispare el evento click especificamente en cualquiera de los tags <a>
divUsuarios.on('click', 'a', function() {

    // $(this) hace refrencias a los tags <a>
    // <a data-id=""> esto es un atributo personalizado por lo general empiezan en data-<NOMBRE_ATRIBUTO>
    var id = $(this).data('id');

    // If Existe un tag 'a' que contiene el nombre de la sala y no tiene el atributo personalizado data-id=""
    if (id) {
        console.log('scj-log-102: ' + id);
        idusuarioMensajePrivado = id;
        divChatbox.html('');
    } else {
        idusuarioMensajePrivado = '';   // Pulso en tag a donde no se envia data-id
    }
});

// Podemos implementar esta simple funcion e invocar en los tags <a>
/*function callIDUser(id) {
    console.log(id);
}*/

frmEnviar.on('submit', function(event) {
    
    event.preventDefault(); // Envia submit pero no recarga la pagina al pulsar el boton

    if (txtMensaje.val().trim() === '') {
        return;
    }

    if (idusuarioMensajePrivado !== '') {
        socket.emit('recibirMensajePrivado', {id: idusuarioMensajePrivado, mensaje: txtMensaje.val()}, function(res) {
            txtMensaje.val('').focus();
            renderizarMensajes(res, true, true);
            scrollBottom();
            console.log('scj-log-126: ' + JSON.stringify(res));
        });
    } else {
        socket.emit('enviarMensajePublico', txtMensaje.val(), function(res) {
            txtMensaje.val('').focus();
            renderizarMensajes(res, true, false);
            scrollBottom();
            console.log('scj-log-133: ' + JSON.stringify(res));
        });
    }
    
});
