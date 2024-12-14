import { baseDeDatosCarrito } from "../base-datos/bd-carrito.js";
import { Carrito} from "../clases/carrito.js";
import { errorSweetAlert2, pendingSweetAlert2 } from '../sweet-alert-2/funciones-sweet-alert-2.js'
import { actualizarStockRepuestos } from "./funciones-repuesto.js";

// Fetch de Carritos:

export function fetchCarritos() {
    return fetch('')
    .then(() => inicializarBDCarrito())
    .then(()=> JSON.parse(localStorage.getItem("baseDeDatosCarrito")))
    .catch((error) => {
        errorSweetAlert2("Error al obtener los carritos! Error: " + error);
        throw error;
    });
}

// Funcion para recuperar la BD de Carritos:

async function recuperarBDCarritos() {
    try {
        let recuperarBaseDatosCarrito = JSON.parse(localStorage.getItem("baseDeDatosCarrito"));
        if(recuperarBaseDatosCarrito === null || recuperarBaseDatosCarrito.length === 0 || !recuperarBaseDatosCarrito) {
            recuperarBaseDatosCarrito = await inicializarBDCarrito();
            return recuperarBaseDatosCarrito;
        }
        return recuperarBaseDatosCarrito;
    } catch(error) { errorSweetAlert2("No se pudo recuperar la Base de Datos de los Carritos! Error: " + error); }
    finally {}
}


export async function inicializarBDCarrito() {
    try {
        let recuperarBD = JSON.parse(localStorage.getItem("baseDeDatosCarrito"));
        //Si no existe la BD la creo:
        if (!recuperarBD || recuperarBD.length === 0) {
            recuperarBD = [];
            localStorage.setItem("baseDeDatosCarrito", JSON.stringify(recuperarBD));
            return recuperarBD;
        }
    } catch(error) { errorSweetAlert2("Error al inicializar la Base de Datos de Carritos! Error: " + error); }
}

// Guardo un nuevo Carrito:

async function altaCarrito(carrito) {
    try {
        if (await verificarExistenciaCarritoPendiente(carrito.codigoUsuario) === false) {
            const maxCodigo = await obtenerCodigoMax() + 1;
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
            errorSweetAlert2("Error: No se puede crear un nuevo carrito, ya que el usuario tiene uno pendiente!");
            return false;
        }
    } catch (error) { errorSweetAlert2(`Error al tratar dar de alta al carrito ${carrito.codigo}! Error: ` + error); }
    finally {}
}

// Verifico que el cliente no tenga ningun carrito pendiente:

async function verificarExistenciaCarritoPendiente(codigoUsuario) {
    try {
        const recuperarBD = await recuperarBDCarritos();
        if (codigoUsuario === NaN || codigoUsuario === null || codigoUsuario.length === 0) {errorSweetAlert2("Error: No se pudo recuperar la información del Usuario!");}
        const verificarCarritoPendiente = recuperarBD.some((carrito) => String(carrito.codigoUsuario) === String(codigoUsuario));
        if (verificarCarritoPendiente.finalizado === false) { return true; }
        else { return false; }
    } catch(error) { errorSweetAlert2("Error al tratar de verificar la Existencia de un carrito pendiente del usuario! Error: " + error);}
    finally {}
}

// Obtengo el código maximo:

async function obtenerCodigoMax() {
    try{
        const recuperarBD = await recuperarBDCarritos();
        if (recuperarBD.length !== 0) {
            const baseDeDatosOrdenadaInversamente = recuperarBD.sort((carritoA, carritoB) => carritoB.codigoCarrito - carritoA.codigoCarrito);
            return baseDeDatosOrdenadaInversamente[0].codigoCarrito;
        } else {return 0;}
    } catch (error) { errorSweetAlert2("Error al tratar de obtener el Código Máximo de Carritos! Error: " + error); }
    finally {}
}

// Devuelve Carrito pendiente de un Usuario:

export async function devuelveCarritoPendienteUsuario(codigoUsuario) {
    try {
        const recuperarBD = await recuperarBDCarritos();
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
                if (await altaCarrito(carritoNuevo) === true) {
                    return carritoNuevo;
                } else { errorSweetAlert2("Error: No se pudo crear un nuevo carrito al usuario!");}
            }
        }
    } catch (error) { errorSweetAlert2("Error al devolver el carrito pendiente del usuario! Error: " + error); }
    finally {}
}

// Devuelve Lista de repuestos de Carrito pendiente de un Usuario:

export async function devuelveListaRepuestosDeCarritoPendiente(codigoUsuario) {
    try {
        const carrito = await devuelveCarritoPendienteUsuario(codigoUsuario);
        if (String(carrito.codigoUsuario) === String(codigoUsuario)) {
            const listaRepuestos = [carrito.listaRepuestos];
            return listaRepuestos;
        } else { errorSweetAlert2("Error: No tiene carritos pendiente el usuario ingresado!");}
    } catch(error) { errorSweetAlert2("Error al devolver la lista de repuestos del carrito pendiente del cliente! Error: " + error); }
    finally {}
}

// Funcion para agregar un Repuesto al Carrito de un Cliente:

export async function agregarRepuestoACarrito(repuesto, codigoUsuario) {
    const recuperarBD = await recuperarBDCarritos();
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
                if (repuestoExistente.cantidad === repuesto.cantidad) {  return false; }
                else { 
                    //En caso de que se modifique la cantidad, la actualizo en la BD:
                    repuestoExistente.cantidad = repuesto.cantidad;  
                    //Actualizo la BD:
                    localStorage.setItem("baseDeDatosCarrito", JSON.stringify(recuperarBD));
                    //Actualizo el monto total del carrito:
                    const montoTotal = await calcularMontoTotalCarrito(codigoUsuario);
                    carritoEncontrado.montoTotal = parseFloat(montoTotal);
                    //Actualizo la BD:
                    localStorage.setItem("baseDeDatosCarrito", JSON.stringify(recuperarBD));
                    return true;
                }                
            }
            //En caso de que el repuesto no exista en el carrito, lo agrego a la lista:
            else { 
                listaRepuestos.push(repuesto); 
                //Actualizo la BD:
                localStorage.setItem("baseDeDatosCarrito", JSON.stringify(recuperarBD));
                //Actualizo el monto total del carrito:
                const montoTotal = await calcularMontoTotalCarrito(codigoUsuario);
                carritoEncontrado.montoTotal = parseFloat(montoTotal);
                //Actualizo la BD:
                localStorage.setItem("baseDeDatosCarrito", JSON.stringify(recuperarBD));
                return true; 
            }
        } else { 
            //En caso de que no exista ningun carrito pendiente, creo uno nuevo:
            const carritoNuevo = new Carrito(0, codigoUsuario, [], 0, false);
            await altaCarrito(carritoNuevo);
            await agregarRepuestoACarrito(repuesto, codigoUsuario);
            return true;
        }
    } else { errorSweetAlert2("Error: No se pudo recuperar correctamente la Base de Datos de los Carritos!"); }
}

//Funcion para devolver la cantidad de repuestos en el carrito de un usuario:

export async function devolverCantidadRepuestosEnCarrito(codigoUsuario) {
    try {
        const listaRepuestos = await devuelveListaRepuestosDeCarritoPendiente(codigoUsuario);
        if (!listaRepuestos || listaRepuestos[0].length === 0) {return 0; }
        let cantidadTotal = 0;
        listaRepuestos[0].forEach((repuesto) => {
            //Verifico que cada repuesto tenga la propiedad 'cantidad':
            if (repuesto && repuesto.cantidad) {
                cantidadTotal += repuesto.cantidad;
            }
        });
        return cantidadTotal;
    } catch (error) { errorSweetAlert2("Error al calcular la cantidad de repuestos en el carrito! Error: " + error); }
}

// Funcion para Eliminar a un Repuesto del Carrito:

export async function eliminarRepuestoDeCarritoPendiente(repuesto, codigoUsuario) {
    try {
        const recuperarBD = await recuperarBDCarritos();
        const carritoPendiente = await devuelveCarritoPendienteUsuario(codigoUsuario);
        let listaRepuestos = carritoPendiente.listaRepuestos;
        //En caso de que no encuentre el carrito pendiente o no tenga ningun repuesto:
        if (!listaRepuestos || listaRepuestos.length === 0) { 
            errorSweetAlert2("Error: El carrito no tiene ningun repuesto a eliminar!"); 
            return false;
        }
        else {
            const repuestoExistente = listaRepuestos.find((repuestoEnLista) => parseInt(repuestoEnLista.codigoRepuesto) === parseInt(repuesto.codigoRepuesto));
            if (!repuestoExistente || repuestoExistente === null || repuestoExistente === undefined) { 
                errorSweetAlert2("Error: No se encontró el repuesto indicado en el carrito pendiente del cliente!"); 
                return false;
            }
            else {
                // Elimino el repuesto encontrado:
                listaRepuestos = listaRepuestos.filter((repuestoEnLista) => parseInt(repuestoEnLista.codigoRepuesto) !== parseInt(repuesto.codigoRepuesto));
                carritoPendiente.listaRepuestos = listaRepuestos;
                // Aseguramos que la baseDeDatosCarrito esté actualizado
                const baseDeDatosCarrito = recuperarBD; 
                const carritoIndex = baseDeDatosCarrito.findIndex((carrito) => carrito.codigoUsuario === codigoUsuario);
                if (carritoIndex !== -1) { baseDeDatosCarrito[carritoIndex] = carritoPendiente;
                } else { baseDeDatosCarrito.push(carritoPendiente); }
                // Guardamos la base de datos actualizada en localStorage
                localStorage.setItem("baseDeDatosCarrito", JSON.stringify(baseDeDatosCarrito));
                //Actualizo el monto total del carrito:
                let montoFinal = 0;
                if (carritoPendiente.listaRepuestos.length === 0) { carritoPendiente.montoTotal = 0; }
                else {
                    montoTotal = await calcularMontoTotalCarrito(codigoUsuario);
                    carritoPendiente.montoTotal = parseFloat(montoFinal);
                }
                //Actualizo la BD:
                localStorage.setItem("baseDeDatosCarrito", JSON.stringify(recuperarBD));
                return true;
            }
        }
    } catch (error) { errorSweetAlert2("Error al tratar de eliminar un repuesto del carrito! Error: " + error); }
    finally {}
}

// Funcion para calcular el monto total del carrito:

export async function calcularMontoTotalCarrito(codigoUsuario) {
    const recuperarBD = await recuperarBDCarritos();
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
        } else { errorSweetAlert2("Error: No se pudo recuperar el Carrito del Cliente solicitado!"); }
    } else { errorSweetAlert2("Error: No se pudo recuperar correctamente la Base de Datos de los Carritos!"); }
}

//Funcion finalizar carrito:

export async function finalizarCarritoEnBD(codigoUsuario) {
    const recuperarBD = await recuperarBDCarritos();
    if (recuperarBD.length >= 0){
        const carritoEncontrado = recuperarBD.find(carrito => carrito.codigoUsuario === codigoUsuario && !carrito.finalizado);
        //Verifico que encuentre el carrito:
        if (carritoEncontrado) {
            //Verifico que el carrito tenga al menos un repuesto:
            if (carritoEncontrado.listaRepuestos.length > 0) {
            //Finalizo el carrito
            carritoEncontrado.finalizado = true;
            //Actualizo BD:
            localStorage.setItem("baseDeDatosCarrito", JSON.stringify(recuperarBD)); 
            const listaRepuestos = carritoEncontrado.listaRepuestos;
            //Actualizo el stock de los repuestos:
            await actualizarStockRepuestos(listaRepuestos);
            } else { errorSweetAlert2("Error: Tiene que agregar al menos un Repuesto al Carrito para finalizarlo!");}
        } else { errorSweetAlert2("Error: No se pudo recuperar el Carrito del Cliente solicitado!"); }
    } else { errorSweetAlert2("Error: No se pudo recuperar correctamente la Base de Datos de los Carritos!"); }
}