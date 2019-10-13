const mensajeFormato = (nombre, mensaje, usuarios) => {
    if (!usuarios)
        return {nombre, mensaje, fecha: new Date().getTime()};
    
    return {
        nombre,
        mensaje,
        usuarios,
        fecha: new Date().getTime()
    };
}

module.exports = {
    mensajeFormato    
}
