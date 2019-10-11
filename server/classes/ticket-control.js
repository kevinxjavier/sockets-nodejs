const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.fecha = new Date().getDate();
        this.tickets = [];
        this.ultimos4Tickets = [];

        let data = require('../data/data.json');
        
        if (data.fecha === this.fecha) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4Tickets = data.ultimos4Tickets;
        } else {
            this.actualizarConteo();
        }
    }

    getUltimo() {
        return `Ticket ${ this.ultimo }`;
    }

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.actualizarConteo();
        return `Ticket ${ this.ultimo }`;
    }

    atentenderTicket(escritorio) {
        if (!this.tickets.length) {
            return null;
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();									// Elimino el primer elemento

		let atenderTicket = new Ticket(numeroTicket, escritorio);
		
        this.ultimos4Tickets.unshift(atenderTicket);            // Agregando elemento al inicio del arreglo
		
		// Ambas soluciones son validas
		this.ultimos4Tickets.splice(4);                         // Eliminando los elementos de la posicion [4] hacia arriba del arreglo al mismo tiempo que devuelve los elementos a eliminar.
		/*if (this.ultimos4Tickets.length > 4) { 
			this.ultimos4Tickets.splice(-1, 1)	// Eliminando el elemento de la posicion [4] al mismo tiempo que devuelve el elemento a eliminar
		}*/

		console.log('Ultimos4Tickets ' + JSON.stringify(this.ultimos4Tickets));
		
		this.actualizarConteo();

		return atenderTicket;
    }

    actualizarConteo() {
        let data = {
            ultimo: this.ultimo,
            fecha: this.fecha,
            tickets: this.tickets,
            ultimos4Tickets: this.ultimos4Tickets
        }
        fs.writeFileSync('./server/data/data.json', JSON.stringify(data));
    }
}

module.exports = {
    TicketControl
}
