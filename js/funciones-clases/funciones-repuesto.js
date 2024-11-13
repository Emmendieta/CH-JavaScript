/* ---------------- IMPORTACIONES ---------------- */

import { baseDeDatosRepuestos } from "../base-datos/bd-repuestos.js";
import { Repuesto } from "../clases/repuesto.js";
import { deshabilitarBotonesAgregarEditarEliminarProducto } from "./funciones-validaciones.js";
import { mostrarModal, modificarTextoBotonEditarRepuesto, modificarTextoBotonEliminarRepuesto, deshabilitarInputsModalRepuesto, desHabilitarCodigoRepuestoInput, 
    limpiarValoresModalAgregarRepuestoACarrito,habilitarInputsModalRepuesto, 
    mostarModalError} from "./funciones-modales.js";

/* ---------------- VARIABLES Y CONSTANTES ---------------- */

import {  
    modalRepuesto, modalRepuestoCodigoRepuesto, modalRepuestoNombre, modalRepuestoModelo, modalRepuestoVehiculo, modalRepuestoPrecio, modalRepuestoCantidad, modalRepuestoImagen,
    modalAgregarRepuestoACarritoLabelCodigoRepuesto, btnBuscarProducto, modalAgregarRepuestoACarrito, btnTextBuscarBuscar, btnTxtBuscarLimpiar,  contenedorRepuestos,
    modalAgregarRepuestoACarritoImagen, modalAgregarRepuestoACarritoNombreRepuesto, modalAgregarRepuestoACarritoModeloRepuesto, modalAgregarRepuestoACarritoVehiculoRepuesto,
    modalAgregarRepuestoACarritoPrecioRepuesto, modalAgregarRepuestoACarritoCantidadRepuesto } from "../variables-constantes.js"

// Funcion recuperardo la Base de Datos de los repuestos:

export function recuperarBDRepuestos() {
    let recuperarBaseDeDatosRepuesto = JSON.parse(localStorage.getItem("baseDeDatosRepuesto"));
    if (recuperarBaseDeDatosRepuesto === null || recuperarBaseDeDatosRepuesto.length === 0) {
        recuperarBaseDeDatosRepuesto = crearBDRepuestos();
        localStorage.setItem("baseDeDatosRepuesto", JSON.stringify(recuperarBaseDeDatosRepuesto));
    }
}

// Funcion Crear Base de Datos Repuesto si no existe:

function crearBDRepuestos() {
    let nuevaBDRepuestos = [];
    const repuesto1 = new Repuesto(1, 10000000, "Retrovisores", 2011, "Astra", 123.55, 15, "https://http2.mlstatic.com/D_NQ_NP_707465-MLA75573563840_042024-O.webp");
    const repuesto2 = new Repuesto(2, 10000001, "Parabrisas", 2011, "Astra", 1000.00, 15, "https://http2.mlstatic.com/D_NQ_NP_814707-MLA75396323622_042024-O.webp");
    const repuesto3 = new Repuesto(3, 10000002, "Volante", 2011, "Astra", 750.99, 10, "https://http2.mlstatic.com/D_797387-MLA51898968943_102022-C.jpg");
    const repuesto4 = new Repuesto(4, 10000003, "Bujías x 4", 2011, "Astra", 250.55, 100, "https://http2.mlstatic.com/D_NQ_NP_960535-MLA31040323720_062019-O.webp");
    const repuesto5 = new Repuesto(5, 10000004, "Amortiguadores x 4", 2011, "Astra", 2500.55, 42, "https://http2.mlstatic.com/D_NQ_NP_607839-MLA78069070590_082024-O.webp");
    const repuesto6 = new Repuesto(6, 10000005, "Faro trasero conductor", 2011, "Astra", 450.55, 99, "https://http2.mlstatic.com/D_NQ_NP_622765-MLA70473923406_072023-O.webp");
    const repuesto7 = new Repuesto(7, 10000006, "Faro trasero acompañante", 2011, "Astra", 450.55, 99, "https://http2.mlstatic.com/D_NQ_NP_851015-MLA76872952329_062024-O.webp");
    const repuesto8 = new Repuesto(8, 10000007, "Puerta delantera acompañante", 2011, "Astra", 5000.75, 2, "https://http2.mlstatic.com/D_NQ_NP_2X_966711-MLA79026787319_092024-T.webp");
    nuevaBDRepuestos = [repuesto1, repuesto2, repuesto3, repuesto4, repuesto5, repuesto6, repuesto7, repuesto8];
    return nuevaBDRepuestos;
}

// Guardar un nuevo repuesto:

export function altaRepuesto(repuesto) {
    if (verificarExistenciaRepuesto(repuesto) === false) {
        const maxCodigo = obtenerCodigoMax() + 1;
        let recuperarBaseDeDatosRepuesto = JSON.parse(localStorage.getItem("baseDeDatosRepuesto"));
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
        const texto = `Feliciades! Se ha creado con exito el Repuesto: "${repuesto.nombre}"!`;
        mostarModalError(texto);
        return true;
    } else {
        alert("Error: El Repuesto que quiere crear ya existe!");
        return false;
    }
}

// Verificar Existencia de repuesto:

function verificarExistenciaRepuesto(repuesto) {
    const recuperarBaseDeDatosRepuesto = baseDeDatosRepuestos;
    if (recuperarBaseDeDatosRepuesto.length === 0) {
        crearBDRepuestos();
    }
    //Si no se cumple con las condiciones del codigo de repuesto:
    if (repuesto.codigoRepuesto === NaN || repuesto.codigoRepuesto < 0) {
        alert("Error: No se puedo leer correctamente el código del Repuesto!");
        //En caso de que lo cumpla:    
    } else {
        //Si no cumple con las condiciones del nombre del repuesto:
        if (repuesto.nombre === "" || repuesto.nombre === NaN) { alert("Error: No se pudo leer correctamente el Nombre del Repuesto!"); }
        else {
            const verificarCodigoRepuesto = recuperarBaseDeDatosRepuesto.some((elemento) => String(elemento.codigoRepuesto) === String(repuesto.codigoRepuesto));
            const verificarNombre = recuperarBaseDeDatosRepuesto.some((elemento) => elemento.nombre === repuesto.nombre);
            //Si encuentra a un Repuesto con el mismo codigo o si tiene el mismo nombre devuelve True:
            if (verificarCodigoRepuesto === true || verificarNombre === true) { return true; }
            //Si no encuentra ningun repuesto con los datos devuelve false:
            else { return false; }
        }
    }
}

// Obtener el codigo Maximo:

function obtenerCodigoMax() {
    const recuperarBaseDeDatosRepuesto = JSON.parse(localStorage.getItem("baseDeDatosRepuesto"));
    if (recuperarBaseDeDatosRepuesto.length === 0) {
        crearBDRepuestos();
    }
    const recuperarBDInvertida = recuperarBaseDeDatosRepuesto.sort((elementoA, elementoB) => elementoB.codigo - elementoA.codigo);
    return parseInt(recuperarBDInvertida[0].codigo);
}

// Devuelve lista de Repuestos:

export function listarRepuestos() {
    const recuperarBaseDeDatosRepuesto = JSON.parse(localStorage.getItem("baseDeDatosRepuesto"));
    //Verifico si la base de datos es null o no es un array
    if (!Array.isArray(recuperarBaseDeDatosRepuesto)) {
        //Si no existe o no es un array, crear la base de datos
        return crearBDRepuestos();
    } else {
        return recuperarBaseDeDatosRepuesto;
    }
}

//Devuelve un Repuesto por codigoRepuesto:

export function listarRepuestoPorCodigoRepuesto(pCodigoRepuesto) {
    const recuperarBaseDeDatosRepuesto = JSON.parse(localStorage.getItem('baseDeDatosRepuesto'));
    // Verifico que se recupere correctamente la BD:
    if (recuperarBaseDeDatosRepuesto.length === 0) {
        recuperarBaseDeDatosRepuesto = crearBDRepuestos();
        //Verifico nuevamente, si no, ya emito la alerta de error:
        if (recuperarBaseDeDatosRepuesto.length === 0) { alert("Error: No se puede recuperar la Base de Datos de los Repuestos, por favor, verifique si puede ver al menos uno!"); }
        // En caso de que se recupera la BD:
        else {
            //Busco al Repuesto segun el codigo:
            const repuestoEncontrado = recuperarBaseDeDatosRepuesto.find((repuesto) => repuesto.codigoRepuesto === pCodigoRepuesto); 
            //Verifico que lo encuentre:
            if (repuestoEncontrado !== 'undefined') {
                const devolucionRepuesto = new Repuesto(repuestoEncontrado.codigo, repuestoEncontrado.codigoRepuesto, repuestoEncontrado.nombre, repuestoEncontrado.modelo, repuestoEncontrado.vehiculo, repuestoEncontrado.precio, repuestoEncontrado.cantidad, repuestoEncontrado.imagen);
                //Devuelvo el repuesto con sus datos:
                return devolucionRepuesto;
            } else { alert("Error: No se pudo recuperar la información del repuesto!"); }
        }
        //En caso de que se recupere la BD:
    } else {
        //Busco al Repuesto segun el codigo:
        const repuestoEncontrado = recuperarBaseDeDatosRepuesto.find((repuesto) => repuesto.codigoRepuesto === parseInt(pCodigoRepuesto));
        //Verifico que lo encuentre:
        if (repuestoEncontrado !== 'undefined') {
            const devolucionRepuesto = new Repuesto(repuestoEncontrado.codigo, repuestoEncontrado.codigoRepuesto, repuestoEncontrado.nombre, repuestoEncontrado.modelo, repuestoEncontrado.vehiculo, repuestoEncontrado.precio, repuestoEncontrado.cantidad, repuestoEncontrado.imagen);
            //Devuelvo el repuesto con sus datos:
            return devolucionRepuesto;
        } else { alert("Error: No se pudo recuperar la información del repuesto!"); }
    }
}

// Funcion para editar un Repuesto:

export function editarRepuesto(repuesto) {
    const recuperarBaseDeDatosRepuesto = JSON.parse(localStorage.getItem('baseDeDatosRepuesto'));
    //Verifico que se recupere correctamente la BD:
    if (recuperarBaseDeDatosRepuesto.length === 0) {
        recuperarBaseDeDatosRepuesto = crearBDRepuestos();
    }
    //Verifico que se haya cargado correctamente la BD:
    if (recuperarBaseDeDatosRepuesto.length === 0) { alert("Error: No se pudo recuperar la Base de Datos de Repuestos!"); }
    //En caso de que recupero correctamente:
    else {
        //Busco al Repuesto segun el codigo:
        const repuestoEncontrado = recuperarBaseDeDatosRepuesto.find((repuestoBD) => parseInt(repuestoBD.codigoRepuesto) === parseInt(repuesto.codigoRepuesto));
        if (repuestoEncontrado !== 'undefined') {
            const indexRepuesto = recuperarBaseDeDatosRepuesto.findIndex((repuestoBD) => parseInt(repuestoBD.codigoRepuesto) === parseInt(repuesto.codigoRepuesto));
            if (indexRepuesto !== -1) {
                const devolucionRepuesto = new Repuesto(parseInt(repuestoEncontrado.codigo), parseInt(repuestoEncontrado.codigoRepuesto), repuestoEncontrado.nombre, parseInt(repuestoEncontrado.modelo),
                    repuestoEncontrado.vehiculo, parseFloat(repuestoEncontrado.precio), parseInt(repuestoEncontrado.cantidad), repuestoEncontrado.imagen);
                //Verifico que no sean los mismo valores que intento guardar:
                if ((devolucionRepuesto.nombre === repuesto.nombre) && (devolucionRepuesto.modelo === parseInt(repuesto.modelo)) && (devolucionRepuesto.vehiculo === repuesto.vehiculo) &&
                    (devolucionRepuesto.precio === parseFloat(repuesto.precio)) && (devolucionRepuesto.cantidad === parseInt(repuesto.cantidad)) && (devolucionRepuesto.imagen === repuesto.imagen)) { alert("Error: No se modifica el Repuesto, ya que los valores ingresados son exactamente iguales a los que estan almacenados!"); }
                else {
                    repuesto.codigo = repuestoEncontrado.codigo;
                    recuperarBaseDeDatosRepuesto[indexRepuesto] = { ...recuperarBaseDeDatosRepuesto[indexRepuesto], ...repuesto };
                    // Guardar la base de datos actualizada en localStorage
                    localStorage.setItem('baseDeDatosRepuesto', JSON.stringify(recuperarBaseDeDatosRepuesto));
                    const texto = `Feliciades! Se ha actualizado con exito el Repuesto: ${repuesto.nombre}!`;
                    mostarModalError(texto);
                }
            } else { alert("Error: No se pudo recuperar el Index del Repuesto deseado!"); }
        } else { alert("Error: No se pudo recuperar correctamente el Repuesto seleccionado!"); }
    }
}

// Funcion para Eliminar un repuesto:

export function eliminarRepuesto(repuesto) {
    const recuperarBaseDeDatosRepuesto = JSON.parse(localStorage.getItem('baseDeDatosRepuesto'));
    //Verifico que se recupere correctamente la BD:
    if (recuperarBaseDeDatosRepuesto.length === 0) {
        crearBDRepuestos();
    }
    //Verifico que se cree o cargue correctamente la BD:
    if (recuperarBaseDeDatosRepuesto.length === 0) { alert("Error: No se pudo recuperar correcamente la Base de Datos de los Repuestos!"); }
    //En caso de que se recupere correctamente:
    else {
        //Busco al Repuesto segun el codigo:
        const repuestoEncontrado = recuperarBaseDeDatosRepuesto.find((repuestoBD) => String(repuestoBD.codigoRepuesto) === String(repuesto.codigo));
        if (repuestoEncontrado !== 'undefined') {
            const indexRepuesto = recuperarBaseDeDatosRepuesto.findIndex((repuestoBD) => String(repuestoBD.codigoRepuesto) === String(repuesto.codigoRepuesto));
            if (indexRepuesto !== -1) {
                recuperarBaseDeDatosRepuesto.splice(indexRepuesto, 1);
                localStorage.setItem('baseDeDatosRepuesto', JSON.stringify(recuperarBaseDeDatosRepuesto));
                const texto = `Feliciades! Se ha eliminado con exito el Repuesto: "${repuesto.nombre}"!`;
                mostarModalError(texto);
            } else { alert("Error: No se pudo recuperar el indez del Repuesto deseado!"); }
        } else { alert("Error: No se pudo recuperar la información del Repuesto solicitado!"); }
    }
}

// Funcion cargar lista de Repuestos:

export function mostrarRepuestos() {
    //Limpio la Lista de Repuestos;
    contenedorRepuestos.innerHTML = '';
    const lista = listarRepuestos();
    //Recorro la lista de Repuestos:
    lista.forEach((repuesto, indice) => {
        //Creo una tarjeta por cada Repuesto que hay en la BD:
        const tarjetaEnHTML = `
            <div class="card" style="width: 18rem;">
                <div class="d-flex justify-content-center">
                    <img src="${repuesto.imagen} || images/imagen-no-disponible.png" class="card-img-top" id="imgRepuesto${indice}"
                    alt="imagen de Repuesto: ${repuesto.nombre}">
                </div>
                <div class="card-body">
                    <h5 class="card-title" id="nombreRepuesto${indice}">Nombre: ${repuesto.nombre}</h5>
                    <p class="card-text" id="codigoRepuesto${indice}">Código: ${repuesto.codigoRepuesto}</p>
                    <p class="card-text" id="vehiculoRepuesto${indice}">Vehículo: ${repuesto.vehiculo}</p>
                    <p class="card-text" id="modeloRepuesto${indice}">Modelo: ${repuesto.modelo}</p>
                    <p class="card-text" id="precioRepuesto${indice}">Precio $${repuesto.precio}</p>
                    <p class="card-text" id="cantidadRepuesto${indice}">Cantidad: ${repuesto.cantidad}</p>
                    <div class="card-body-botones">
                        <div class="card-boyd btnEdition">
                            <button class="btn btn-outline-success btnEditProducto" data-indice="${indice}"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button class="btn btn-outline-danger btnDeleteProducto" data-indice="${indice}"><i class="fa-regular fa-circle-xmark"></i></button>
                        </div>
                        <div class="card-body-btnAgregar">
                            <button class="btn btn-success btnAgregarProductoCarrito" data-indice="${indice}">Agregar al carrito</button>
                        </div>
                    </div>           
                </div>
            </div>
        `;
        //Añado los Repuestos al HTML:
        contenedorRepuestos.insertAdjacentHTML('beforeend', tarjetaEnHTML);
        //En Caso de que haga click en el boton de editar un determinado Repuesto:
        const btnEditarRepuesto = contenedorRepuestos.querySelector(`.btnEditProducto[data-indice="${indice}"]`);
        //Evento si hago click en el boton editar:
        btnEditarRepuesto.addEventListener('click', () => {
            modalRepuestoCodigoRepuesto.value = repuesto.codigoRepuesto;
            modalRepuestoNombre.value = repuesto.nombre;
            modalRepuestoModelo.value = repuesto.modelo;
            modalRepuestoVehiculo.value = repuesto.vehiculo;
            modalRepuestoPrecio.value = repuesto.precio;
            modalRepuestoCantidad.value = repuesto.cantidad;
            modalRepuestoImagen.value = repuesto.imagen;
            modificarTextoBotonEditarRepuesto();
            habilitarInputsModalRepuesto();
            desHabilitarCodigoRepuestoInput();
            mostrarModal(modalRepuesto);
        });
        //En caso de que haga click en el boton de eliminar un determinado Repuesto:
        const btnEliminarRepuesto = contenedorRepuestos.querySelector(`.btnDeleteProducto[data-indice="${indice}"]`);
        //Evento si hago click en el boton eliminar:
        btnEliminarRepuesto.addEventListener('click', () => {
            modalRepuestoCodigoRepuesto.value = repuesto.codigoRepuesto;
            modalRepuestoNombre.value = repuesto.nombre;
            modalRepuestoModelo.value = repuesto.modelo;
            modalRepuestoVehiculo.value = repuesto.vehiculo;
            modalRepuestoPrecio.value = repuesto.precio;
            modalRepuestoCantidad.value = repuesto.cantidad;
            modalRepuestoImagen.value = repuesto.imagen;
            modificarTextoBotonEliminarRepuesto();
            deshabilitarInputsModalRepuesto();
            mostrarModal(modalRepuesto);
        });
        //En caso de que haga click en el boton de agregar al carrito un determinado Repuesto:
        const btnAgregarProductoCarrito = contenedorRepuestos.querySelector(`.btnAgregarProductoCarrito[data-indice="${indice}"]`);
        //Evento si hago click en el boton agregar a carrito:
        btnAgregarProductoCarrito.addEventListener('click', () => {
            //Cargo los valores del Repuesto Seleccionado en el Modal Agregar a Carrito:
            modalAgregarRepuestoACarritoImagen.src = repuesto.imagen;
            modalAgregarRepuestoACarritoLabelCodigoRepuesto.textContent = `Codigo Repuesto: ${repuesto.codigoRepuesto}`;
            modalAgregarRepuestoACarritoNombreRepuesto.textContent = `Nombre: ${repuesto.nombre}`;
            modalAgregarRepuestoACarritoModeloRepuesto.textContent = `Modelo: ${repuesto.modelo}`;
            modalAgregarRepuestoACarritoVehiculoRepuesto.textContent = `Vehiculo: ${repuesto.vehiculo}`;
            modalAgregarRepuestoACarritoPrecioRepuesto.textContent = `Precio: ${repuesto.precio}`;
            modalAgregarRepuestoACarritoCantidadRepuesto.textContent = `Cantidad: ${repuesto.cantidad}`;
            limpiarValoresModalAgregarRepuestoACarrito();
            mostrarModal(modalAgregarRepuestoACarrito);
        });
        deshabilitarBotonesAgregarEditarEliminarProducto();
    });
}

// Devuelve una Lista de Repuesto pero filtandola con el Buscador:

export function listarRepuestosConFiltro(nombreBuscar) {
    const recuperarBaseDeDatosRepuesto = JSON.parse(localStorage.getItem("baseDeDatosRepuesto"));
    const listaRepuestosConFiltro = recuperarBaseDeDatosRepuesto.filter((repuesto) => repuesto.nombre.includes(nombreBuscar));
    return listaRepuestosConFiltro;
}

// Listar Repuestos con filtro:

export function repuestosConFiltro() {
    const txtBuscarRepuesto = document.getElementById('textoBuscadorRepuesto');
    if ((txtBuscarRepuesto.value.length === 0 || txtBuscarRepuesto.value === NaN) && btnBuscarProducto.textContent === btnTextBuscarBuscar) {
        //En caso de que busque sin datos, trae la lista de repuestos completa:
        alert("Error: Tiene que escribir el nombre del repuesto que desea buscar!");
    } else if (txtBuscarRepuesto.value.length > 0 && btnBuscarProducto.textContent === btnTextBuscarBuscar) {
        //En caso de que haya un texto, busca si el repuesto existe, y si existe, trae todos los que conincidan con la busqueda:
        const listaFiltrada = listarRepuestosConFiltro(txtBuscarRepuesto.value);
        if (listaFiltrada.length === 0 || listaFiltrada === NaN) {
            alert(`Error: No existe ningun repuesto con nombre: ${txtBuscarRepuesto.value}!`);
        } else {
            btnBuscarProducto.textContent = btnTxtBuscarLimpiar;
            mostrarRepuestosConFiltro(listaFiltrada);
        }
    }
}

// Listar Repuesto con filtro aplicado:

function mostrarRepuestosConFiltro(listaFiltrada) {
    //Limpio la Lista de Repuestos;
    contenedorRepuestos.innerHTML = '';
    //Recorro la lista de Repuestos:
    listaFiltrada.forEach((repuesto, indice) => {
        //Creo una tarjeta por cada Repuesto que hay en la BD:
        const tarjetaEnHTML = `
            <div class="card" style="width: 18rem;">
                <div class="d-flex justify-content-center">
                    <img src="${repuesto.imagen} || images/imagen-no-disponible.png" class="card-img-top" id="imgRepuesto${indice}"
                    alt="imagen de Repuesto: ${repuesto.nombre}">
                </div>
                <div class="card-body">
                    <h5 class="card-title" id="nombreRepuesto${indice}">Nombre: ${repuesto.nombre}</h5>
                    <p class="card-text" id="codigoRepuesto${indice}">Código: ${repuesto.codigoRepuesto}</p>
                    <p class="card-text" id="vehiculoRepuesto${indice}">Vehículo: ${repuesto.vehiculo}</p>
                    <p class="card-text" id="modeloRepuesto${indice}">Modelo: ${repuesto.modelo}</p>
                    <p class="card-text" id="precioRepuesto${indice}">Precio $${repuesto.precio}</p>
                    <p class="card-text" id="cantidadRepuesto${indice}">Cantidad: ${repuesto.cantidad}</p>
                    <div class="card-body-botones">
                        <div class="card-boyd btnEdition">
                            <button class="btn btn-outline-success btnEditProducto" data-indice="${indice}"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button class="btn btn-outline-danger btnDeleteProducto" data-indice="${indice}"><i class="fa-regular fa-circle-xmark"></i></button>
                        </div>
                        <div class="card-body-btnAgregar">
                            <button class="btn btn-success btnAgregarProductoCarrito" data-indice="${indice}">Agregar al carrito</button>
                        </div>
                    </div>           
                </div>
            </div>
        `;
        //Añado los Repuestos al HTML:
        contenedorRepuestos.insertAdjacentHTML('beforeend', tarjetaEnHTML);
        //En Caso de que haga click en el boton de editar un determinado Repuesto:
        const btnEditarRepuesto = contenedorRepuestos.querySelector(`.btnEditProducto[data-indice="${indice}"]`);
        //Evento si hago click en el boton editar:
        btnEditarRepuesto.addEventListener('click', () => { alert("Para Modificar un Repuesto tiene que cargar la lista original sin filtros!"); });
        //En caso de que haga cliick en el boton de eliminar un determinado Repuesto:
        const btnEliminarRepuesto = contenedorRepuestos.querySelector(`.btnDeleteProducto[data-indice="${indice}"]`);
        //Evento si hago click en el boton eliminar:
        btnEliminarRepuesto.addEventListener('click', () => { alert("Error: Para Elimnar un Repuesto tiene que cargar la lista original sin filtros!"); });
        deshabilitarBotonesAgregarEditarEliminarProducto();
    });
}

//Actualizo el Stock de los repuesto cuando se finaliza un carrito:

export function actualizarStockRepuestos(listaRepuestos) {
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

