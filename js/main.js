/* -------------------------------- IMPORTACIONES -------------------------------- */

import { inicializarBDCarrito, agregarRepuestoACarrito,actualizarMontototalCarrito, calcularMontoTotalCarrito, devuelveCarritoPendienteUsuario } from "./funciones-clases/funciones-carrito.js";
import { inicializarBaseDatosUsuario, devolverCodigoUsuario } from "./funciones-clases/funciones-usuario.js";
import { recuperarBDRepuestos, mostrarRepuestos, repuestosConFiltro } from "./funciones-clases/funciones-repuesto.js";
import { deshabilitarBotonesAgregarEditarEliminarProducto, deshabilitarBotonesAgregarProductoACarrito, devolverNombreUsuario } from "./funciones-clases/funciones-validaciones.js";
import { iniciarLogin, validarDatosIngresados, cerrarSesion } from "./funciones-clases/funciones-botones.js";
import { limpiarModalLogin, validarSignUp, limpiarDatosModalSingUp, confirmarAltaRepuesto, mostrarModal, limpiarDatosModalAltaRepuesto, cambiosEnCheckBoxModalRepuesto,
        restablecerBotonAltaRepuesto, habilitarInputsModalRepuesto, validarRepuestoAgregarACarrito, limpiarValoresModalAgregarRepuestoACarrito,
        ocutalModal, mostrarModalFinalizarCarrito, mostarModalError } from "./funciones-clases/funciones-modales.js";       

/* -------------------------------- CONSTANTES Y VARIABLES -------------------------------- */

import { modalRepuesto, modalRepuestoBtnConfirm, modalRepuestoCheckBox, btnLogin, btnFinalizarCarrito, btnBuscarProducto, btnAltaRepuesto, modalLoginBtnX, modalLoginbtnCancel, 
    modalBtnLogin, modalSingUpButton, modalSingUpX, modalSingUpCerrar, modalRepuestoBtnCerrar, modalRepuestoBtnX, modalAgregarRepuestoACarrito, 
    modalAgregarRepuestoACarritoBtnConfirmar, pUserName, invitadoText, btnTextBuscarBuscar, btnTxtBuscarLimpiar } from "./variables-constantes.js"

/* -------------------------------- LOGIN -------------------------------- */

// Evento de hacer Click para iniciar Sesion y mostrar el Modal de Login:

btnLogin.addEventListener('click', () => {
    if (pUserName.textContent === invitadoText) {
        //En caso de que no haya nadie logueado, se inicia el proceso de login:
        iniciarLogin();
    } else if (pUserName.textContent !== invitadoText) {
        //En caso de que ya se haya logueado, se iniciar el logout:
        cerrarSesion();
    } 
});

// Evento de hacer Click para iniciar sesion con usuario y password y cerrar el Modal del Login:

modalBtnLogin.addEventListener('click', () => {
    validarDatosIngresados();
});

//Evento cuando se hace click en el Boton de Cancelar del Modal Login:

modalLoginbtnCancel.addEventListener('click', () => {
    limpiarModalLogin()
});

//Evento cuando se hace click en la X del Modal Login:

modalLoginBtnX.addEventListener('click', () => {
    limpiarModalLogin();
});

/* -------------------------------- SING UP -------------------------------- */

// Evento Registrar Nuevo Usuario:
modalSingUpButton.addEventListener('click', () => {
    validarSignUp();
});

// Evento hacer click en el boton X del modal Sing up:

modalSingUpX.addEventListener('click', () => {
    limpiarDatosModalSingUp();
});

//Evento hacer click en el boton Cerrar del modal Sing up:

modalSingUpCerrar.addEventListener('click', () => {
    limpiarDatosModalSingUp();
});

// Evento hacer click en el boton de Alta Nuevo Repuesto:

btnAltaRepuesto.addEventListener('click', () => {
    restablecerBotonAltaRepuesto();
    //Habilito los inputs:
    habilitarInputsModalRepuesto();
    mostrarModal(modalRepuesto);
});

// Evento hacer click en confirmar el alta de un Nuevo Repuesto:

modalRepuestoBtnConfirm.addEventListener('click', () => {
    confirmarAltaRepuesto();
});

// Evento hacer click en el boton Cerrar del Modal de Alta Repuesto: 

modalRepuestoBtnCerrar.addEventListener('click', () => {
    limpiarDatosModalAltaRepuesto();
});

// Evento hacer click en el boton X del Modal de Alta Repuesto:

modalRepuestoBtnX.addEventListener('click', () => {
    limpiarDatosModalAltaRepuesto();
});

// Evento en cambio de estado en el CheckBox del Modal de Alta Repuesto:

modalRepuestoCheckBox.addEventListener('change', function () {
    cambiosEnCheckBoxModalRepuesto();
});

// Evento de Filtar Repuestos:

btnBuscarProducto.addEventListener('click', (event) => {
    if (btnBuscarProducto.textContent === btnTextBuscarBuscar) {
        //Evita que se recargue la pagina de forma completa!
        event.preventDefault();
        //Filta los elementos buscados con la funcion:
        repuestosConFiltro();

    } else if (btnBuscarProducto.textContent === btnTxtBuscarLimpiar) {
        //Evita que se recargue la pagina de forma completa!
        event.preventDefault();
        //Trae la lista original:
        mostrarRepuestos()
        //Cambia el texto del boton buscar para que pueda realizar otra búsqueda:
        btnBuscarProducto.textContent = btnTextBuscarBuscar;
    }
});

// Evento Mostrar Listado Completo Carrito para Finalizar:

btnFinalizarCarrito.addEventListener('click', () => {
    const nombreUsuario = devolverNombreUsuario();
    const codigoUsuario = devolverCodigoUsuario(nombreUsuario);
    mostrarModalFinalizarCarrito(codigoUsuario);
});

/* ---------------- MODAL AGREGAR REPUESTO A CARRITO ---------------- */

modalAgregarRepuestoACarritoBtnConfirmar.addEventListener('click', () => {
    const repuesto = validarRepuestoAgregarACarrito();
    const nombreUsuario = devolverNombreUsuario();
    const codigoUsuario = devolverCodigoUsuario(nombreUsuario);
        if (repuesto !== undefined) {
        agregarRepuestoACarrito(repuesto, codigoUsuario);
        const montoTotal = calcularMontoTotalCarrito(codigoUsuario);
        actualizarMontototalCarrito(codigoUsuario, montoTotal);
        limpiarValoresModalAgregarRepuestoACarrito();
        ocutalModal(modalAgregarRepuestoACarrito);
    }
});

/* -------------------------------- INICIALIZAR CUANDO SE CARGA LA PAGINA -------------------------------- */

inicializarBaseDatosUsuario();
recuperarBDRepuestos();
mostrarRepuestos();
inicializarBDCarrito();
deshabilitarBotonesAgregarEditarEliminarProducto();
deshabilitarBotonesAgregarProductoACarrito();


