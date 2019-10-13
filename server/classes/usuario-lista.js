class UsuarioLista {
    constructor() {
        this.usuarioList = [];
    }

    addUsuario(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.usuarioList.push(persona);
        return this.usuarioList;
    }

    getUsuario(id) {
        // Ambas formas de buscar hacen lo mismo
        // return this.usuarioList.find(persona => persona.id === id);
        return this.usuarioList.filter(persona => persona.id === id)[0];    // Devuelve un arreglo con el o los elementos encontrados
    }

    getUsuarios() {
        return this.usuarioList;
    }

    getUsuarioPorSala(sala) {

    }

    deleteUsuario(id) {
        
        let usuarioBorrado = this.getUsuario(id);

        // let idArr = this.usuarioList.findIndex(persona => persona.id === id);
        // delete this.usuarioList[id];    // Forma1, Elimina el elemento de esa posicion pero lo deja la casilla undefined, Ver Ejemplo1
        // this.usuarioList.splice(idArr + 1, 1);   // Forma2, 
        this.usuarioList = this.usuarioList.filter(usuario => usuario.id != id); // Forma3, retorna las persona.id diferentes al id

        return usuarioBorrado;
    }
}

/* Ejemplo1
    let usuarios = new UsuarioLista();
    usuarios.addUsuario(1, 'kevin');
    usuarios.addUsuario(2, 'maria');
    usuarios.addUsuario(3, 'diana');

    usuarios.deleteUsuario(2);

    let u = usuarios.getUsuarios();

    for(let i = 0; i < u.length ; i++)  {
        //if (u[i]) 
            console.log(u[i]);
    }

/*    OUTPUT:
        { id: 1, nombre: 'kevin' }
        undefined
        { id: 3, nombre: 'diana' }
*/

module.exports = {
    UsuarioLista
}