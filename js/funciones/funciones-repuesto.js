/* ---------------- IMPORTACIONES ---------------- */

import { baseDeDatosRepuestos } from "../base-datos/bd-repuestos.js";
import { Repuesto } from "../clases/repuesto.js";
import { crearContenidoRepuestoBottom } from "../elementos-html/main-html/repuestos-html.js";
import { errorSweetAlert2, pendingSweetAlert2 } from "../sweet-alert-2/funciones-sweet-alert-2.js"; 
import { btnTxtBuscarLimpiar, demoraCargarRepuestos } from "../variables-constantes/var-const.js";

/* ---------------- VARIABLES Y CONSTANTES ---------------- */

//Funcion Fetch para invocar a la BD de Repuestos:

export function fetchRepuestos() {
    return fetch('')
    .then(() => recuperarBDRepuestos())
    .then(() => JSON.parse(localStorage.getItem("baseDeDatosRepuesto")))
    .catch((error) => {
        errorSweetAlert2("Error al obtener la base de datos de Repuesto: " + error);
        throw error;
    }); 
}

// Funcion recuperardo la Base de Datos de los repuestos:
async function recuperarBDRepuestos() {
    try {
        let recuperarBaseDeDatosRepuesto = JSON.parse(localStorage.getItem("baseDeDatosRepuesto"));
        if (recuperarBaseDeDatosRepuesto === null || recuperarBaseDeDatosRepuesto.length === 0) {
            recuperarBaseDeDatosRepuesto = crearBDRepuestos();
            localStorage.setItem("baseDeDatosRepuesto", JSON.stringify(recuperarBaseDeDatosRepuesto));
        }
    } catch (error) { errorSweetAlert2("No se pudo inicializar la Base de Datos correctamente. Error: " + error); }
    finally {}    
}

async function devuelveBDRepuestos() {
    try {
        let recuperarBaseDeDatosRepuesto = JSON.parse(localStorage.getItem("baseDeDatosRepuesto"));
        if (recuperarBaseDeDatosRepuesto === null || recuperarBaseDeDatosRepuesto === undefined) { 
            await recuperarBDRepuestos(); 
            recuperarBaseDeDatosRepuesto = JSON.parse(localStorage.getItem("baseDeDatosRepuesto"));
        }
        return recuperarBaseDeDatosRepuesto;
    } catch(error) { errorSweetAlert2("Error al tratar de devolver la Base de Datos de los Repuestos! Error: " + error); }
    finally {}    
}

// Funcion Crear Base de Datos Repuesto si no existe:

function crearBDRepuestos() {
    let nuevaBDRepuestos = [];
    const repuesto1 = new Repuesto(1, 10000000, "Retrovisores", 2011, "Astra", 123.55, 50, "https://http2.mlstatic.com/D_NQ_NP_707465-MLA75573563840_042024-O.webp");
    const repuesto2 = new Repuesto(2, 10000001, "Parabrisas", 2011, "Astra", 1000.00, 30, "https://http2.mlstatic.com/D_NQ_NP_814707-MLA75396323622_042024-O.webp");
    const repuesto3 = new Repuesto(3, 10000002, "Volante", 2011, "Astra", 750.99, 20, "https://http2.mlstatic.com/D_797387-MLA51898968943_102022-C.jpg");
    const repuesto4 = new Repuesto(4, 10000003, "Bujías x 4", 2011, "Astra", 250.55, 100, "https://http2.mlstatic.com/D_NQ_NP_960535-MLA31040323720_062019-O.webp");
    const repuesto5 = new Repuesto(5, 10000004, "Amortiguadores x 4", 2011, "Astra", 2500.55, 50, "https://http2.mlstatic.com/D_NQ_NP_607839-MLA78069070590_082024-O.webp");
    const repuesto6 = new Repuesto(6, 10000005, "Faro trasero conductor", 2011, "Astra", 450.55, 100, "https://http2.mlstatic.com/D_NQ_NP_622765-MLA70473923406_072023-O.webp");
    const repuesto7 = new Repuesto(7, 10000006, "Faro trasero acompañante", 2011, "Astra", 450.55, 100, "https://http2.mlstatic.com/D_NQ_NP_851015-MLA76872952329_062024-O.webp");
    const repuesto8 = new Repuesto(8, 10000007, "Puerta delantera acompañante", 2011, "Astra", 5000.75, 100, "https://http2.mlstatic.com/D_NQ_NP_2X_966711-MLA79026787319_092024-T.webp");
    nuevaBDRepuestos = [repuesto1, repuesto2, repuesto3, repuesto4, repuesto5, repuesto6, repuesto7, repuesto8];
    return nuevaBDRepuestos;
}

// Guardar un nuevo repuesto:

async function altaRepuesto(repuesto) {
    try {
        let recuperarBaseDeDatosRepuesto = await fetchRepuestos();
        if (await verificarExistenciaRepuesto(repuesto) === false) {
            const maxCodigo = await obtenerCodigoMax() + 1;
            const nuevoRepuesto = new Repuesto(
                maxCodigo,
                parseInt(repuesto.codigoRepuesto),
                repuesto.nombre,
                parseInt(repuesto.modelo),
                repuesto.vehiculo,
                parseFloat(repuesto.precio),
                parseInt(repuesto.cantidad),
                repuesto.imagen
            );
            recuperarBaseDeDatosRepuesto.push(nuevoRepuesto);
            localStorage.setItem("baseDeDatosRepuesto", JSON.stringify(recuperarBaseDeDatosRepuesto));
            return true;
        } else { throw new Error("El Repuesto que quiere crear ya existe!"); }
    }catch (error) {
        errorSweetAlert2("Error al dar de alta el repuesto: " + error.message);
        return false;
    }
}

// Verificar Existencia de repuesto:

async function verificarExistenciaRepuesto(repuesto) {
    try {
        const recuperarBaseDeDatosRepuesto = await fetchRepuestos();
        if (recuperarBaseDeDatosRepuesto.length === 0) {
            crearBDRepuestos();
        }
        if (isNaN(repuesto.codigoRepuesto) || repuesto.codigoRepuesto < 0) { throw new Error("No se pudo leer correctamente el código del Repuesto!");}
        if (repuesto.nombre === "" || repuesto.nombre === NaN) { throw new Error("No se pudo leer correctamente el Nombre del Repuesto!"); }
        const verificarCodigoRepuesto = await recuperarBaseDeDatosRepuesto.some((elemento) => String(elemento.codigoRepuesto) === String(repuesto.codigoRepuesto));
        const verificarNombre = await recuperarBaseDeDatosRepuesto.some((elemento) => elemento.nombre === repuesto.nombre);
        if (verificarCodigoRepuesto || verificarNombre) { return true; }
        return false;
    } catch (error) {
        errorSweetAlert2("Error al verificar la existencia del repuesto: " + error.message);
        return false;
    }
}

// Obtener el codigo Maximo:

async function obtenerCodigoMax() {
    try {
        const recuperarBaseDeDatosRepuesto = await fetchRepuestos();
        if (recuperarBaseDeDatosRepuesto.length === 0) {
            crearBDRepuestos();
        }
        const recuperarBDInvertida = recuperarBaseDeDatosRepuesto.sort((elementoA, elementoB) => elementoB.codigo - elementoA.codigo);
        return parseInt(recuperarBDInvertida[0].codigo);
    } catch (error) { errorSweetAlert2("Error al tratar de Obtener el Código Máximo de los Repuestos! Error: " + error); }
    finally {}
} 

// Funcion para Validar datos del Repuesto:

export function validarAltaProducto() {
    try {
        const modalRepuestoCodigoRepuesto = document.getElementById('modalCodigoRepuesto');
        const modalRepuestoNombre = document.getElementById('modalNombreRepuesto');
        const modalRepuestoModelo = document.getElementById('modalModeloRepuesto');
        const modalRepuestoVehiculo = document.getElementById('modalVehiculoRepuesto');
        const modalRepuestoPrecio = document.getElementById('modalPrecioRepuesto');
        const modalRepuestoCantidad = document.getElementById('modalCantidadRepuesto');
        const modalRepuestoImagen = document.getElementById('modalImagenRepuesto');
        const regexCodigoRepuesto = /^\d{8}$/;
        if (modalRepuestoCodigoRepuesto.value.length > 0 && regexCodigoRepuesto.test(modalRepuestoCodigoRepuesto.value)) {
            const regexNombre =  /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚüÜ\s\-_,.]+$/;
            if (modalRepuestoNombre.value.length > 0 && regexNombre.test(modalRepuestoNombre.value)) {
                const regexModelo = /^[0-9]+$/;
                if (modalRepuestoModelo.value.length > 0 && parseInt(modalRepuestoModelo.value) > 1800 && regexModelo.test(modalRepuestoModelo.value)) {
                    const regexVehiculo = /^[a-zA-Z ]+$/;
                    if (modalRepuestoVehiculo.value.length > 0 && regexVehiculo.test(modalRepuestoVehiculo.value)) {
                        const regexPrecio = /^\d+(\.\d{2})?$/;
                        if (modalRepuestoPrecio.value.length > 0 && parseFloat(modalRepuestoPrecio.value) > 0 && regexPrecio.test(modalRepuestoPrecio.value)) {
                            if (modalRepuestoCantidad.value.length > 0 && parseInt(modalRepuestoCantidad.value) > 0 && regexModelo.test(modalRepuestoCantidad.value)) {
                                if (modalRepuestoImagen.value === "") {
                                    //En caso de que no establezca una url de la imagen:
                                    const recursoImagen = "https://github.com/Emmendieta/CH-JavaScript/blob/main/images/Imagen-no-disponible.png?raw=true";
                                    const nuevoRepuestoSinImagen = new Repuesto(0, parseInt(modalRepuestoCodigoRepuesto.value), modalRepuestoNombre.value, parseInt(modalRepuestoModelo.value), modalRepuestoVehiculo.value, parseFloat(modalRepuestoPrecio.value), parseInt(modalRepuestoCantidad.value), recursoImagen);
                                    return nuevoRepuestoSinImagen;
                                } else {
                                    //En caso de que establezca una url de la imgen:
                                    const nuevoRepuesto = new Repuesto(0, parseInt(modalRepuestoCodigoRepuesto.value), modalRepuestoNombre.value, parseInt(modalRepuestoModelo.value), modalRepuestoVehiculo.value, parseFloat(modalRepuestoPrecio.value), parseInt(modalRepuestoCantidad.value), modalRepuestoImagen.value);
                                    return nuevoRepuesto;
                                };
                            } else { throw new Error("Error: La cantidad del Repuesto no puede ser nula y solo acepta valores enteros positivos!"); }
                        } else { throw new Error("Error: El precio no puede ser nulo y solo toma valores positivos y con 2 decimales. Ej. 1000.58"); }
                    } else { throw new Error("Error: El nombre del vehículo no puede ser nulo y solo toma palabras!"); }
                } else { throw new Error("Error: El Modelo del Repuesto no puede ser nulo y solo toma valores numéricos mayores a 1800!"); }
            } else { throw new Error("Error: El Nombre del Repuesto no puede ser nulo, y solo acepta palabras sin caraceteres especiales!"); }
        } else { throw new Error("Error: El Código del Repuesto no puede ser nulo, y solo toma valores numericos de 8 dígitos sin espacios, letras, ni caracteres especiales!"); }
    } catch (error) { errorSweetAlert2("Error al validar el Repuesto. Error: " + error); }   
    finally {}
}

export async function procesoABMRepuesto(repuesto, opcion) {
    let resultado = false;
    //Proceso completo para dar el alta a un nuevo Repuesto:
    if (opcion === 1) {
        resultado = await altaRepuesto(repuesto);
        if (resultado === true) {
            crearContenidoRepuestoBottom(1);
            return resultado;
        } else { return false }
    }
    //Proceso completo para modificar a un Repuesto:
    else if (opcion === 2) {
        resultado = await editarRepuesto(repuesto);
        if (resultado === true) {
            crearContenidoRepuestoBottom(1);
            return resultado;
        } else { return false; }
    }
    //Proceso completo para eliminar a un Repuesto:
    else if (opcion === 3) {
        resultado = await eliminarRepuesto(repuesto);
        if (resultado === true) {
            crearContenidoRepuestoBottom(1);
            return resultado;
        } else { resultado; }
    }
    else { throw new Error("Error al proceder en el proceso de ABM del Repuesto!"); }
}

// Devuelve lista de Repuestos:

export async function listarRepuestos() {
    try {
        const respuesta = await fetchRepuestos();
        if (respuesta === null) {
            const listaRepuestos = crearBDRepuestos();
            return listaRepuestos;
            
        } else { return respuesta; }
    } catch (error) { errorSweetAlert2("Error al listar los repuestos. Error: "+ error); }
    finally {}
}

// Funcion para editar un Repuesto:

export async function editarRepuesto(repuesto) {
    try {
        //Obtengo la base de datos de repuestos mediante fetchRepuestos
        let baseDeDatosRepuesto = await fetchRepuestos();
        // Verifico si la base de datos se recuperó correctamente
        if (!baseDeDatosRepuesto || baseDeDatosRepuesto.length === 0) { baseDeDatosRepuesto = crearBDRepuestos(); }
        if (!baseDeDatosRepuesto || baseDeDatosRepuesto.length === 0) { throw new Error("Error: No se pudo recuperar la Base de Datos de Repuestos!"); }
        //Busco el repuesto en la base de datos según el código:
        const repuestoEncontrado = baseDeDatosRepuesto.find((repuestoBD) => parseInt(repuestoBD.codigoRepuesto) === parseInt(repuesto.codigoRepuesto));
        if (!repuestoEncontrado) { throw new Error("Error: No se pudo recuperar correctamente el Repuesto seleccionado!"); }
        //Buscar el índice del repuesto:
        const indexRepuesto = baseDeDatosRepuesto.findIndex((repuestoBD) => parseInt(repuestoBD.codigoRepuesto) === parseInt(repuesto.codigoRepuesto));
        if (indexRepuesto === -1) { throw new Error("Error: No se pudo recuperar el Index del Repuesto deseado!"); }
        // Creo una instancia del repuesto encontrado para verificar cambios:
        const devolucionRepuesto = new Repuesto(parseInt(repuestoEncontrado.codigo),parseInt(repuestoEncontrado.codigoRepuesto), repuestoEncontrado.nombre, parseInt(repuestoEncontrado.modelo)
        ,repuestoEncontrado.vehiculo, parseFloat(repuestoEncontrado.precio), parseInt(repuestoEncontrado.cantidad), repuestoEncontrado.imagen);
        // Verifico si los valores a guardar son iguales a los almacenados:
        if ( devolucionRepuesto.nombre === repuesto.nombre && devolucionRepuesto.modelo === parseInt(repuesto.modelo) && devolucionRepuesto.vehiculo === repuesto.vehiculo &&
            devolucionRepuesto.precio === parseFloat(repuesto.precio) && devolucionRepuesto.cantidad === parseInt(repuesto.cantidad) && 
            devolucionRepuesto.imagen === repuesto.imagen) { throw new Error("Error: No se modifica el Repuesto, ya que los valores ingresados son exactamente iguales a los que están almacenados!"); }
        //Actualizo los datos del repuesto:
        repuesto.codigo = repuestoEncontrado.codigo;
        baseDeDatosRepuesto[indexRepuesto] = { ...baseDeDatosRepuesto[indexRepuesto], ...repuesto };
        //Guardo la base de datos actualizada en localStorage:
        localStorage.setItem("baseDeDatosRepuesto", JSON.stringify(baseDeDatosRepuesto));
        // Retorno true indicando que se editó correctamente:
        return true;
    } catch (error) {
        console.error("Error al editar el repuesto:", error);
        errorSweetAlert2("Error al editar el repuesto: " + error.message);
        return false;
    }
    finally {}
}

export async function eliminarRepuesto(repuesto) {
    try {
        const recuperarBaseDeDatosRepuesto = await fetchRepuestos();
        //Verifico que se recupere correctamente la BD:
        if (recuperarBaseDeDatosRepuesto.length === 0) { crearBDRepuestos(); }
        //Verifico que se cree o cargue correctamente la BD:
        if (recuperarBaseDeDatosRepuesto.length === 0) { throw new Error("Error: No se pudo recuperar correcamente la Base de Datos de los Repuestos!"); }
        //En caso de que se recupere correctamente:
        else {
            //Busco al Repuesto segun el codigo:
            const repuestoEncontrado = recuperarBaseDeDatosRepuesto.find((repuestoBD) => String(repuestoBD.codigoRepuesto) === String(repuesto.codigo));
            if (repuestoEncontrado !== 'undefined') {
                const indexRepuesto = recuperarBaseDeDatosRepuesto.findIndex((repuestoBD) => String(repuestoBD.codigoRepuesto) === String(repuesto.codigoRepuesto));
                if (indexRepuesto !== -1) {
                    recuperarBaseDeDatosRepuesto.splice(indexRepuesto, 1);
                    localStorage.setItem('baseDeDatosRepuesto', JSON.stringify(recuperarBaseDeDatosRepuesto));
                    return true;
                } else { throw new Error("Error: No se pudo recuperar el indez del Repuesto deseado!"); }
            } else { throw new Error("Error: No se pudo recuperar la información del Repuesto solicitado!"); }
        }
    } catch (error) {
        console.error("Error al eliminar el repuesto:", error);
        errorSweetAlert2("Error al eliminar el repuesto: " + error.message);
    }
}

/* ---------------- FILTRAR REPUESTOS ---------------- */

export async function procesoFiltrarRepuestos() {
    const txtBuscarRepuesto = document.getElementById('textoBuscadorRepuesto');
    if (txtBuscarRepuesto.value.length === 0 || txtBuscarRepuesto.value === NaN) { throw new Error("Error: Tiene que escribir el nombre del repuesto a buscar!"); }
    else {
        try {
            pendingSweetAlert2(`de la búsqueda del repuesto: ${txtBuscarRepuesto.value}`, demoraCargarRepuestos);
            const listaFiltrada = await listarRepuestosConFiltro(txtBuscarRepuesto.value);
            if (listaFiltrada.length !== null) { 
                if(listaFiltrada.length > 0) {
                    const btnBuscarRepuesto = document.getElementById('btnBuscarRepuesto');
                    btnBuscarRepuesto.textContent = btnTxtBuscarLimpiar;
                }    
                return listaFiltrada;
            }
        } catch(error) { errorSweetAlert2("Error en el proceso Filtrar Repuestos! Error: " + error); }
        finally {}
    }
}

// Devuelve una Lista de Repuesto pero filtandola con el Buscador:

async function listarRepuestosConFiltro(nombreBuscar) {
    try {
        const recuperarBaseDeDatosRepuesto = await fetchRepuestos();
        const listaRepuestosConFiltro = recuperarBaseDeDatosRepuesto.filter((repuesto) => repuesto.nombre.includes(nombreBuscar));
        return listaRepuestosConFiltro;
    } catch (error) { errorSweetAlert2("Error al listar repuestos con filtro! Error: " + error);}
    finally {}
}

//Devuelve un Repuesto por codigoRepuesto:

export async function listarRepuestoPorCodigoRepuesto(pCodigoRepuesto) {
    try {
        const recuperarBaseDeDatosRepuesto = await devuelveBDRepuestos();
        // Verifico que se recupere correctamente la BD:
        if (recuperarBaseDeDatosRepuesto.length === 0) {
            recuperarBaseDeDatosRepuesto = crearBDRepuestos();
            //Verifico nuevamente, si no, ya emito la alerta de error:
            if (recuperarBaseDeDatosRepuesto.length === 0) { errorSweetAlert2("Error: No se puede recuperar la Base de Datos de los Repuestos, por favor, verifique si puede ver al menos uno!"); }
            // En caso de que se recupera la BD:
            else {
                //Busco al Repuesto segun el codigo:
                const repuestoEncontrado = recuperarBaseDeDatosRepuesto.find((repuesto) => repuesto.codigoRepuesto === pCodigoRepuesto); 
                //Verifico que lo encuentre:
                if (repuestoEncontrado !== 'undefined') {
                    const devolucionRepuesto = new Repuesto(parseInt(repuestoEncontrado.codigo), parseInt(repuestoEncontrado.codigoRepuesto), repuestoEncontrado.nombre, parseInt(repuestoEncontrado.modelo), repuestoEncontrado.vehiculo, parseFloat(repuestoEncontrado.precio), parseInt(repuestoEncontrado.cantidad), repuestoEncontrado.imagen);
                    //Devuelvo el repuesto con sus datos:
                    return devolucionRepuesto;
                } else { errorSweetAlert2("Error: No se pudo recuperar la información del repuesto!"); }
            }
            //En caso de que se recupere la BD:
        } else {
            //Busco al Repuesto segun el codigo:
            const repuestoEncontrado = recuperarBaseDeDatosRepuesto.find((repuesto) => repuesto.codigoRepuesto === parseInt(pCodigoRepuesto));
            //Verifico que lo encuentre:
            if (repuestoEncontrado !== 'undefined') {
                const devolucionRepuesto = new Repuesto(parseInt(repuestoEncontrado.codigo), parseInt(repuestoEncontrado.codigoRepuesto), repuestoEncontrado.nombre, parseInt(repuestoEncontrado.modelo), repuestoEncontrado.vehiculo, parseFloat(repuestoEncontrado.precio),  parseInt(repuestoEncontrado.cantidad), repuestoEncontrado.imagen);
                //Devuelvo el repuesto con sus datos:
                return devolucionRepuesto;
            } else { errorSweetAlert2("Error: No se pudo recuperar la información del repuesto!"); }
        }
    } catch (error) { errorSweetAlert2("Error al listar el Repuesto por el código indicado! Error: " + error); }
    finally {}
}

//Actualizo el Stock de los repuesto cuando se finaliza un carrito:

export async function actualizarStockRepuestos(listaRepuestos) {
    const recuperarBD = baseDeDatosRepuestos;
    if (recuperarBD.length === 0) {
        crearBDRepuestos();
    } else {
        if (listaRepuestos.length > 0) {
            listaRepuestos.forEach((repuestoCarrito) => {
                const repuestoBD = recuperarBD.find((repuesto) => parseInt(repuesto.codigoRepuesto) === repuestoCarrito.codigoRepuesto);
                if (repuestoBD) {repuestoBD.cantidad -= repuestoCarrito.cantidad; }
            });
            localStorage.setItem('baseDeDatosRepuesto', JSON.stringify(baseDeDatosRepuestos));
        }
    }
} 
