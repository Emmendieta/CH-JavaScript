class Repuesto {
    constructor (codigo, nombre, modelo, vehiculo, precio, cantidad, imagen) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.modelo = modelo;
        this.vehiculo = vehiculo;
        this.precio = precio;
        this.cantidad = cantidad;
        this.imagen = imagen;
    }

    //Getters:

    getCodigo = function(){
        return this.codigo;
    }

    getNombre = function() {
        return this.nombre;
    }

    getModelo = function() {
        return this.modelo;
    }

    getVehiculo = function() {
        return this.vehiculo;
    }

    getPrecio = function() {
        return this.precio;
    }

    getCantidad = function() {
        return this.cantidad;
    }

    getImagen = function() {
        return this.imagen;
    }

    //Setters:

    setCodigo = function(codigo) {
        this.codigo = codigo;
    }

    setNombre = function(nombre) {
        this.nombre = nombre;
    }

    setModelo = function(modelo) {
        this.modelo = modelo;
    }

    setVehiculo = function(vehiculo) {
        this.vehiculo = vehiculo;   
    }

    setPrecio = function(precio) {
        this.precio = precio;
    }

    setCantidad = function(cantidad) {
        this.cantidad = cantidad;
    }

    setImagen = function(imagen) {
        this.imagen = imagen;
    }

}

/* Exportando la Clase Repuesto al main.js */

export {Repuesto};
