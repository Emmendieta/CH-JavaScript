/* -------------------------------- IMPORTACIONES -------------------------------- */

import { Repuesto } from "./clases/repuesto.js";
import { Usuario } from "./clases/usuario.js";
import { altaUsuario, inicializarBaseDatosUsuario, recuperarUsuarioDeBD, guardarSesionUsuario, verificarSesion } from "./funciones-clases/funciones-usuario.js";
import { recuperarBDRepuestos, mostrarRepuestos, listarRepuestosConFiltro, altaRepuesto, repuestosConFiltro } from "./funciones-clases/funciones-repuesto.js";
import { deshabilitarBotonesAgregarEditarEliminarProducto, deshabilitarBotonesAgregarProductoACarrito } from "./funciones-clases/funciones-validaciones.js";
import { iniciarLogin, validarDatosIngresados, cerrarSesion } from "./funciones-clases/funciones-botones.js";
import { limpiarModalLogin, validarSignUp, limpiarDatosModalSingUp, confirmarAltaRepuesto, mostrarModal, limpiarDatosModalAltaRepuesto, 
    cambiosEnCheckBoxModalRepuesto, restablecerBotonAltaRepuesto, habilitarInputsModalRepuesto } from "./funciones-clases/funciones-modales.js";

/* -------------------------------- CONSTANTES Y VARIABLES -------------------------------- */

const btnLogin = document.getElementById('btnLogin');



const sectionFormLogin = document.getElementById('hdNavSectionLogin');
const singUpButton = document.getElementById('btnSingUp');

const btnBuscarProducto = document.getElementById('btnBuscarRepuesto');
const btnAltaRepuesto = document.getElementById('btnAddRepuesto');

//listarRepuestos
//const listaRepuestos = listarRepuestos();

/* ---- Modal Login ---- */

const modalLoginBtnX = document.getElementById('btnModalLoginX');
const modalLoginbtnCancel = document.getElementById('btnModalLoginCancel');
const modalBtnLogin = document.getElementById('btnModalLogin');

/* ---- Modal Sing Up ---- */

const modalSingUpButton = document.getElementById('btnModalSingUp');
const modalSingUpX = document.getElementById('modalSingUpX');
const modalSingUpCerrar = document.getElementById('btnModalsingUpCerrar');

/* ---- Modal Repuesto ---- */

const modalRepuesto = document.getElementById('modalRepuesto');
const modalRepuestoCodigoRepuesto = document.getElementById('modalCodigoRepuesto');
const modalRepuestoNombre = document.getElementById('modalNombreRepuesto');
const modalRepuestoModelo = document.getElementById('modalModeloRepuesto');
const modalRepuestoVehiculo = document.getElementById('modalVehiculoRepuesto');
const modalRepuestoPrecio = document.getElementById('modalPrecioRepuesto');
const modalRepuestoCantidad = document.getElementById('modalCantidadRepuesto');
const modalRepuestoImagen = document.getElementById('modalImagenRepuesto');
const modalRepuestoBtnConfirm = document.getElementById('btnModalConfirmRepuesto');
const modalRepuestoCheckBox = document.getElementById('checkBoxRepuestoImagen');
const modalRepuestoBtnCerrar = document.getElementById('btnModalAltaRepuestoCerrar');
const modalRepuestoBtnX = document.getElementById('btnModalAltaRepuestoX');

const pUserName = document.getElementById('pUserName');
const botonesAgregarCarrito = document.querySelectorAll('.btnAgregarProductoCarrito');
const botonCarrito = document.getElementById('btnCarrito');
const iconoCarrito = document.getElementById('iconoCarrito');

// Se configuro repuestos como let porque con const no me trae los valores de cada repuesto

const cerrarSesionText = "Cerrar Sesión";
const loginText = "Iniciar Sesión";
const invitadoText = "Usuario: Invitado";
const btnTextBuscarBuscar = "Buscar";
const btnTxtBuscarLimpiar = "Limpiar";


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

modalRepuestoBtnCerrar.addEventListener('click', ()=> {
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
})


/* -------------------------------- INICIALIZAR CUANDO SE CARGA LA PAGINA -------------------------------- */

inicializarBaseDatosUsuario();
mostrarRepuestos();
deshabilitarBotonesAgregarEditarEliminarProducto();
deshabilitarBotonesAgregarProductoACarrito();


