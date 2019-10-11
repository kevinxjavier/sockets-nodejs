// Forma 1
//const io = require('../server');
// Forma 2
const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');
const ticketControl = new TicketControl();

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

    cliente.on('siguienteTicket', (data, callback) => {
        callback(ticketControl.siguiente());
    });

    cliente.emit('ticketActual', ticketControl.getUltimo());

    cliente.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) 
            return callback('No hay escritorio, debe enviarlo');

        let atenderTicket = ticketControl.atentenderTicket(data.escritorio);

        if(!atenderTicket)
            return callback('No hay tickets');

        callback(atenderTicket.numero);
    });
});
