const fs = require('fs');

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.fecha = new Date().getDate();

        let data = require('../data/data.json');
        
        if (data.fecha === this.fecha) {
            this.ultimo = data.ultimo;
        } else {
            this.actualizarConteo();
        }
    }

    siguiente() {
        this.ultimo += 1;
        this.actualizarConteo();
        return `Ticket ${ this.ultimo }`;
    }

    actualizarConteo() {
        let data = {
            ultimo: this.ultimo,
            fecha: this.fecha
        }
        fs.writeFileSync('./server/data/data.json', JSON.stringify(data));
    }
}

module.exports = {
    TicketControl
}
