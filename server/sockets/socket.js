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

        client.join(data.sala);

        usuario.addUsuario(client.id, data.nombre, data.sala);

        //let res = mensajeFormato('Admin', `${data.nombre} con id ${client.id} acaba de conectarse`, usuario.getUsuarioPorSala(data.sala));
        let res = mensajeFormato('Admin', `${data.nombre} acaba de conectarse`, usuario.getUsuarioPorSala(data.sala));
        // El broadcast se envia a los otros client.id no al mismo que lo ejecuto. Para eso le enviamos el callback.
        client.broadcast.to(data.sala).emit('listaUsuarios', res);

        callback({usuario: 'Admin', mensaje: `Se ha conectado como ${data.nombre} con id ${client.id}`, usuarios: usuario.getUsuarioPorSala(data.sala)});
    });

    client.on('disconnect', () => {
        let usuarioBorrado = usuario.deleteUsuario(client.id);

        if (usuarioBorrado) {
            console.log(`Usuario desconectandose ${usuarioBorrado.nombre} con id ${usuarioBorrado.id}`);

            //let res = mensajeFormato('Admin', `${usuarioBorrado.nombre} con id ${usuarioBorrado.id} ha abandonado el chat`, usuario.getUsuarioPorSala(usuarioBorrado.sala));
            let res = mensajeFormato('Admin', `${usuarioBorrado.nombre} ha abandonado el chat`, usuario.getUsuarioPorSala(usuarioBorrado.sala));
            client.broadcast.to(usuarioBorrado.sala).emit('listaUsuarios', res);
        } else {
            console.log(`Se ha tratado de desconectar ${client.id} sin \"El nombre y sala que son necesarios\"`);
        }
    });

    // Se puede ejecutar esto directamente en la consola del navegador: socket.emit('enviarMensajePublico', 'Hola');
    client.on('enviarMensajePublico', (mensaje, callback) => {
        let nombre = usuario.getUsuario(client.id);
        let res = mensajeFormato(nombre, mensaje, null);
        client.broadcast.to(nombre.sala).emit('recibirMensajePublico', res);    // Envio el mensaje a todos 
        callback(res);                                                          // Me envio el mensaje a mi
    });

    // Se puede ejecutar esto directamente en la consola del navegador: socket.emit('recibirMensajePrivado', {id: '464dsfds', mensaje: 'Hola'});
    client.on('recibirMensajePrivado', (body) => {
        let nombre = usuario.getUsuario(client.id);
        let res = mensajeFormato(nombre, body.mensaje, null);
        client.broadcast.to(body.id).emit('recibirMensajePrivado', res);
    });
    
});
