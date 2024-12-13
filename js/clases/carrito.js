export class Carrito {
    constructor(codigoCarrito, codigoUsuario, listaRepuestos, montoTotal, finalizado) {
        this.codigoCarrito = codigoCarrito;
        this.codigoUsuario = codigoUsuario;
        this.listaRepuestos = listaRepuestos;
        this.montoTotal = montoTotal;
        this.finalizado = finalizado
    }
}