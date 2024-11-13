import { baseDeDatosCarrito } from "../base-datos/bd-carrito.js";
import { Carrito} from "../clases/carrito.js";
import { actualizarStockRepuestos } from "./funciones-repuesto.js";

// Inicializar la BD Carrito:

export function inicializarBDCarrito() {
    const recuperarBD = JSON.parse(localStorage.getItem("baseDeDatosCarrito"));
    //Si no existe la BD la creo:
    if (!recuperarBD || recuperarBD.length === 0) {
        localStorage.setItem("baseDeDatosCarrito", JSON.stringify(baseDeDatosCarrito));
    }
}

// Guardo un nuevo Carrito:

function altaCarrito(carrito) {
    if (verificarExistenciaCarritoPendiente(carrito.codigoUsuario) === false) {
        const maxCodigo = obtenerCodigoMax() + 1;
        const nuevoCarrito = new Carrito(
            maxCodigo,
            carrito.codigoUsuario,
            carrito.listaRepuestos,
            carrito.montoTotal,
            carrito.finalizado
        )
        baseDeDatosCarrito.push(nuevoCarrito);
        localStorage.setItem("baseDeDatosCarrito", JSON.stringify(baseDeDatosCarrito));
        return true;
    } else { 
        alert("Error: No se puede crear un nuevo carrito, ya que el usuario tiene uno pendiente!");
        return false;
    }
}

// Verifico que el cliente no tenga ningun carrito pendiente:

function verificarExistenciaCarritoPendiente(codigoUsuario) {
    const recuperarBD = JSON.parse(localStorage.getItem("baseDeDatosCarrito"));
    if (codigoUsuario === NaN || codigoUsuario === null || codigoUsuario.length === 0) {alert("Error: No se pudo recuperar la información del Usuario!");}
    const verificarCarritoPendiente = recuperarBD.some((carrito) => String(carrito.codigoUsuario) === String(codigoUsuario));
    if (verificarCarritoPendiente.finalizado === false) { return true; }
    else { return false; }
}

// Obtengo el código maximo:

function obtenerCodigoMax() {
    const recuperarBD = JSON.parse(localStorage.getItem("baseDeDatosCarrito"));
    if (recuperarBD.length !== 0) {
        const baseDeDatosOrdenadaInversamente = recuperarBD.sort((carritoA, carritoB) => carritoB.codigoCarrito - carritoA.codigoCarrito);
        return baseDeDatosOrdenadaInversamente[0].codigoCarrito;
    } else {return 0;}
}

// Devuelve Carrito pendiente de un Usuario:

export function devuelveCarritoPendienteUsuario(codigoUsuario) {
    const recuperarBD = baseDeDatosCarrito;
    if (recuperarBD.length >= 0) {
        //Busco un carrito a nombre del usuario:
        const carritoEncontrado = recuperarBD.find((carrito) => (String(carrito.codigoUsuario) === String(codigoUsuario)) && carrito.finalizado === false);
        //En caso de que encuentre uno:
        if (carritoEncontrado !== undefined) { 
            //En caso de que el carrito no este finalizado:
            const devolucionCarrito = new Carrito(carritoEncontrado.codigoCarrito, carritoEncontrado.codigoUsuario, carritoEncontrado.listaRepuestos, carritoEncontrado.montoTotal, carritoEncontrado.finalizado);
            return devolucionCarrito;
        } else {
            //Si no tiene ningun carrito pendiente, le asigno uno nuevo:            
            const carritoNuevo = new Carrito(0, codigoUsuario, [], 0, false);
            if (altaCarrito(carritoNuevo) === true) {
                return carritoNuevo;
            } else { alert("Error: No se pudo crear un nuevo carrito al usuario!");}
        }
    }
}

// Devuelve Lista de repuestos de Carrito pendiente de un Usuario:

export function devuelveListaRepuestosDeCarritoPendiente(codigoUsuario) {
    const carrito = devuelveCarritoPendienteUsuario(codigoUsuario);
    if (String(carrito.codigoUsuario) === String(codigoUsuario)) {
        const listaRepuestos = [carrito.listaRepuestos];
        return listaRepuestos;
    } else { alert("Error: No tiene carritos pendiente el usuario ingresado!");}
}

// Funcion para agregar un Repuesto al Carrito de un Cliente

export function agregarRepuestoACarrito(repuesto, codigoUsuario) {
    const recuperarBD = baseDeDatosCarrito;
    if (recuperarBD.length >= 0) {
        //Busco un carrito a nombre del usuario:
        const carritoEncontrado = recuperarBD.find((carrito) => (String(carrito.codigoUsuario) === String(codigoUsuario)) && carrito.finalizado === false);
        //Verifico que encuentre el carrito:
        if (carritoEncontrado !== undefined) {
            const listaRepuestos = carritoEncontrado.listaRepuestos;
            const repuestoExistente = listaRepuestos.find((repuestoEnLista) => parseInt(repuestoEnLista.codigoRepuesto) === parseInt(repuesto.codigoRepuesto));
            //En caso de que el repuesto exista en el carrito, acutalizo la cantidad:
            if (repuestoExistente) { 
                //Verifico que la cantidad no sea la misma:
                if (repuestoExistente.cantidad === repuesto.cantidad) { alert("Error: Se quiso agregar al carrito el mismo repuesto con la misma cantidad que ya esta añadido!");}
                else { repuestoExistente.cantidad = repuesto.cantidad;  }                
            }
            //En caso de que el repuesto no exista en el carrito, lo agrego a la lista:
            else { listaRepuestos.push(repuesto); }
            //Actualizo la BD:
            localStorage.setItem("baseDeDatosCarrito", JSON.stringify(recuperarBD));
        } else { 
            //En caso de que no exista ningun carrito pendiente, creo uno nuevo:
            const carritoNuevo = new Carrito(0, codigoUsuario, [], 0, false);
            altaCarrito(carritoNuevo);
            agregarRepuestoACarrito(repuesto, codigoUsuario);
        }
    } else { alert("Error: No se pudo recuperar correctamente la Base de Datos de los Carritos!"); }
}

// Funcion para calcular el monto total del carrito:

export function calcularMontoTotalCarrito(codigoUsuario) {
    const recuperarBD = baseDeDatosCarrito;
    if (recuperarBD.length >= 0){
        //Busco un carrito a nombre del usuario:
        const carritoEncontrado = recuperarBD.find((carrito) => (String(carrito.codigoUsuario) === String(codigoUsuario)) && carrito.finalizado === false);
        //Verifico que encuentre el carrito:
        if (carritoEncontrado !== undefined) {
            const listaRepuestos = carritoEncontrado.listaRepuestos;
            let montoTotal = 0;
            if(listaRepuestos.length === 0) { return montoTotal; }
            else {
                listaRepuestos.forEach((repuesto) => {
                    montoTotal += repuesto.cantidad * repuesto.precio;
                });
                return montoTotal;
            }
        } else { alert("Error: No se pudo recuperar el Carrito del Cliente solicitado!"); }
    } else { alert("Error: No se pudo recuperar correctamente la Base de Datos de los Carritos!"); }
}

//Funcion actualizo el montoTotal en el Carrito:

export function actualizarMontototalCarrito(codigoUsuario,montoTotal) {
    const recuperarBD = baseDeDatosCarrito;
    if (recuperarBD.length >= 0){
        //Busco un carrito a nombre del usuario:
        const carritoEncontrado = recuperarBD.find((carrito) => (String(carrito.codigoUsuario) === String(codigoUsuario)) && carrito.finalizado === false);
        //Verifico que encuentre el carrito:
        if (carritoEncontrado !== undefined) {
            carritoEncontrado.montoTotal = montoTotal;
            //Actualizo la BD:
            localStorage.setItem("baseDeDatosCarrito", JSON.stringify(recuperarBD));    
        } else { alert("Error: No se pudo recuperar el Carrito del Cliente solicitado!"); }
    } else { alert("Error: No se pudo recuperar correctamente la Base de Datos de los Carritos!"); }
}

//Funcion finalizar carrito:

export function finalizarCarritoEnBD(codigoUsuario) {
    const recuperarBD = baseDeDatosCarrito;
    if (recuperarBD.length >= 0){
        const carritoEncontrado = recuperarBD.find(carrito => carrito.codigoUsuario === codigoUsuario && !carrito.finalizado);
        //Verifico que encuentre el carrito:
        if (carritoEncontrado) {
            //Finalizo el carrito
            carritoEncontrado.finalizado = true;
            //Actualizo BD:
            localStorage.setItem("baseDeDatosCarrito", JSON.stringify(recuperarBD)); 
            const listaRepuestos = carritoEncontrado.listaRepuestos;
            //Actualizo el stock de los repuestos:
            actualizarStockRepuestos(listaRepuestos)
        } else { alert("Error: No se pudo recuperar el Carrito del Cliente solicitado!"); }
    } else { alert("Error: No se pudo recuperar correctamente la Base de Datos de los Carritos!"); }
} 