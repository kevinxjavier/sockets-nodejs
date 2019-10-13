const { io } = require('../server');
const { UsuarioLista } = require('../classes/usuario-lista');
const { mensajeFormato } = require('../utils/util');

const usuario = new UsuarioLista();

io.on('connection', (client) => {

    console.log(`Usuario conectandose con id ${client.id}`);

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({status: 'Failed', mensaje: 'El nombre y sala son necesarios'});
        }

        let usuarioNombre = usuario.addUsuario(client.id, data.nombre, data.sala);

        let res = mensajeFormato('Admin', `${data.nombre} con id ${client.id} acaba de conectarse`, usuarioNombre);
        // El broadcast se envia a los otros client.id no al mismo que lo ejecuto. Para eso le enviamos el callback.
        client.broadcast.emit('listaUsuarios', res);

        callback({usuario: 'Admin', mensaje: `Se ha conectado como ${data.nombre} con id ${client.id}`, usuarios: usuarioNombre});
    });

    client.on('disconnect', () => {
        let usuarioBorrado = usuario.deleteUsuario(client.id);

        if (usuarioBorrado) {
            console.log(`Usuario desconectandose ${usuarioBorrado.nombre} con id ${usuarioBorrado.id}`);

            let res = mensajeFormato('Admin', `${usuarioBorrado.nombre} con id ${usuarioBorrado.id} ha abandonado el chat`, usuario.getUsuarios());
            client.broadcast.emit('listaUsuarios', res);
        } else {
            console.log(`Se ha tratado de desconectar ${client.id} sin \"El nombre y sala que son necesarios\"`);
        }
    });

    // Se puede ejecutar esto directamente en la consola del navegador: socket.emit('enviarMensajePublico', 'Hola');
    client.on('enviarMensajePublico', (mensaje) => {
        let nombre = usuario.getUsuario(client.id);
        let res = mensajeFormato(nombre, mensaje, null);
        client.broadcast.emit('recibirMensajePublico', res);
    });

    // Se puede ejecutar esto directamente en la consola del navegador: socket.emit('recibirMensajePrivado', {id: '464dsfds', mensaje: 'Hola'});
    client.on('recibirMensajePrivado', (body) => {
        let nombre = usuario.getUsuario(client.id);
        let res = mensajeFormato(nombre, body.mensaje, null);
        client.broadcast.to(body.id).emit('recibirMensajePrivado', res);
    });
    
});
