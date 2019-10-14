# Notas:

Servidor express sirve el contenido de la carpeta public en la web.

```
npm install
```

# Rama

08-version-chat: Version de Sockets Sala de Chats (eviando mensajes broadcast, mensajes a un id particular y a un grupo). Con interfaz grafica. "Version chat publico sin implementacion de chat usuario privado".

# Uso Navegador

Conectarse al chat con un nombre y a una sala.

```
$ curl http://localhost:3000/chat.html?nombre=juan&sala=juegos
$ curl http://localhost:3000/chat.html?nombre=kevin&sala=citas
$ curl http://localhost:3000/chat.html?nombre=diana&sala=juegos

```

# Uso Consola Navegador

Enviar mensaje privado a un usuario, la respuesta lleva el id de usuario que lo envio en un objeto.

```
socket.emit('recibirMensajePrivado', {id: 'yVLookAQLr9K7t8tAAAA', mensaje: 'Hola como estas'});
```
