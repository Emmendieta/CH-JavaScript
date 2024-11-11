/* ---- IMPORTACIONES ---- */

import {
    validarUsuario, validarPassword, cambiarNombreBotonLoginIniciarSesion, cambiarNombreBotonLoginCerrarSesion,
    cambiarTextoUsuarioLogueado, cambiarTextoUsuarioInvitado, habilitarBotonCarrito, habilitarIconoCarrito, deshabilitarBotonCarrito, dehabilitarIconoCarrito,
    habilitarBotonesAgregarEditarEliminarProducto, deshabilitarBotonesAgregarEditarEliminarProducto, habilitarBotonesAgregarProductoACarrito,
    deshabilitarBotonesAgregarProductoACarrito
} from "./funciones-validaciones.js";
import { mostrarModal, ocutalModal, limpiarModalLogin } from "./funciones-modales.js";
import { recuperarUsuarioDeBD, devolverCodigoUsuario } from "./funciones-usuario.js";
import { devuelveListaRepuestosDeCarritoPendiente } from "./funciones-carrito.js";

/* ---- VARIABLES Y CONSTANTES ---- */

const btnLogin = document.getElementById('btnLogin');
const singUpButton = document.getElementById('btnSingUp');
const nombreUsuarioLogueado = document.getElementById('pUserName');
const cerrarSesionText = "Cerrar Sesión";
const loginText = "Iniciar Sesión";
const adminText = "Usuario: admin";

/* ---- Modal Login: ---- */

const modalLogin = document.getElementById('modalLogin');
const modalLoginNombreUsuario = document.getElementById('nombreUsuarioLogin');
const modalLoginPassword = document.getElementById('passwordLogin');
const modalBtnLogin = document.getElementById('btnModalLogin');

/* ---------------- LOGIN ---------------- */

// Usuario y Password validado e Inicio de Sesión:

export function validarDatosIngresados() {
    let usuarioValidado = validarUsuario(modalLoginNombreUsuario.value);
    let passwordValidado = validarPassword(modalLoginPassword.value);
    //Si no estan validados, muestra la siguiente alerta:
    if ((usuarioValidado === "" || passwordValidado === "") && btnLogin.textContent === loginText) {
        alert("Error: El nombre de usuario y/o password no pueden ser nulos!");
        //En caso de que este todo Ok se inicia sesión:    
    } else if ((usuarioValidado !== "" || passwordValidado !== "") && btnLogin.textContent === loginText) {
        //Verifico que Exista el Usuario en la Base de Datos:
        if (recuperarUsuarioDeBD(usuarioValidado, passwordValidado) === true) {
            //Cambio el texto para mostrar el usuario Logueado:
            cambiarTextoUsuarioLogueado(usuarioValidado);
            //Oculto el boton para Registrarse:
            ocultarBotonSingUp();
            //Habilito el boton Carrito:
            habilitarBotonCarrito();
            //Habilito el Icono del Carrito:
            habilitarIconoCarrito();
            //Oculto el Modal del Login:
            ocutalModal(modalLogin);
            //Limpio los valores ingresados en el Modal del Login;
            limpiarModalLogin();
            //Cambio el texto del botón login por "cerrar sesion":
            cambiarNombreBotonLoginIniciarSesion();
            //Habilito los botones de edicion en el caso de que se logue el Administrador:
            habilitarBotonesAgregarEditarEliminarProducto();
            //Habilito los botones de Agregar Producto al carrito:
            habilitarBotonesAgregarProductoACarrito();
            //recupero el Codigo del usuario Logueado:
            const codigoUsuario = devolverCodigoUsuario(usuarioValidado, passwordValidado);
            //Verifico que no existan carritos pendientes a nombre del Usuario:
            devuelveListaRepuestosDeCarritoPendiente(codigoUsuario);


            //En caso de que no exista o no coincida algo de los datos, se emite una alerta:
        } else { alert("Error: Usuario y/o Contraseña incorrectos, por favor verifiquelo!"); }
    }
}

// Funcion para que en el caso de que no se haya iniciado sesion, se muestra el Modal Login:

export function iniciarLogin() {
    if (btnLogin.textContent === loginText) {
        mostrarModal(modalLogin);
    }
}

// Funcion ocultar Boton Registrarse:

function ocultarBotonSingUp() {
    if (btnLogin.textContent === loginText) {
        singUpButton.style.display = 'none';
    };
}

/* ---------------- LOGOUT ---------------- */

// Funcion cerrar Sesion:

export function cerrarSesion() {
    if (nombreUsuarioLogueado !== loginText) {
        mostrarBotonSingUp();
        cambiarNombreBotonLoginCerrarSesion();
        cambiarTextoUsuarioInvitado();
        deshabilitarBotonCarrito();
        dehabilitarIconoCarrito();
        deshabilitarBotonesAgregarEditarEliminarProducto();
        deshabilitarBotonesAgregarProductoACarrito();
    }
}

// Funcion mostrar Boton Registrarse:

function mostrarBotonSingUp() {
    if (btnLogin.textContent === cerrarSesionText) {
        singUpButton.style.display = 'block';
    };
}







