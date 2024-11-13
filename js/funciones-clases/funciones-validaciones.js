/* ---------------- VARIABLES Y CONSTANTES ---------------- */

import { btnLogin, btnAltaRepuesto, invitadoText, nombreUsuarioLogueado, cerrarSesionText,loginText, btnCarrito, iconoCarrito, mnSectArtAdd, adminText } from "../variables-constantes.js"

/* ---------------- FUNCIONES ---------------- */

// Función para validar Nombre de Usuario:

export function validarUsuario(usuario) {
    //Validacion del usuario:
    const regexUsuario = /^[a-zA-Z]+$/;
    if (usuario.length > 0 && regexUsuario.test(usuario) == true) {
        return usuario;
    } else {
        usuario = "";
        return usuario;
    }
}

//Funcion para validar el Password del usuario:

export function validarPassword(password) {
    //Validacion del password:
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/;
    if (password.length > 0 && regexPassword.test(password) == true) {
        return password;
    } else {
        password = "";
        return password;
    }
}

//Funcion para cambiar el texto del Boton login si se inicio sesion:

export function cambiarNombreBotonLoginIniciarSesion() {
    if (btnLogin.textContent === loginText) { btnLogin.textContent = cerrarSesionText; }
}

// Funcion cambiar el texto del boton login cuando se cierra sesion:

export function cambiarNombreBotonLoginCerrarSesion() {
    if (btnLogin.textContent === cerrarSesionText) { btnLogin.textContent = loginText; }
}

// Funcion cambiar el texto del usuario registrado:

export function cambiarTextoUsuarioLogueado(nombreUsuario) {
    //Si el texto es "Usuario: Invitado, lo cambia:"
    if (nombreUsuarioLogueado.textContent === invitadoText) {
        nombreUsuarioLogueado.textContent = `Usuario: ${nombreUsuario.toLowerCase()}`;
    }
}

//Devuelvo el nombre de usuario logueado:

export function devolverNombreUsuario() {
    const nombreUsuario = (nombreUsuarioLogueado.textContent).replace("Usuario: ", "");
    return nombreUsuario;
}

// Funcion para volver al texto original de usuario invitado:

export function cambiarTextoUsuarioInvitado() {
    nombreUsuarioLogueado.textContent = invitadoText;
}

/* ---- FUNCIONES BOTONES AGREGAR PRODUCTO A CARRITO ---- */

export function habilitarBotonesAgregarProductoACarrito() {
    const botonesAgregarCarrito = document.querySelectorAll('.btnAgregarProductoCarrito');
    botonesAgregarCarrito.forEach((boton) => {
        boton.disabled = false;
        boton.style.opacity = 1;
        boton.style.pointerEvents = 'auto';
    });
}

export function deshabilitarBotonesAgregarProductoACarrito() {
    const botonesAgregarCarrito = document.querySelectorAll('.btnAgregarProductoCarrito');
    botonesAgregarCarrito.forEach((boton) => {
        boton.disabled = true;
        boton.style.opacity = 0.5;
        boton.style.pointerEvents = 'none';
    })
}

/* ---- FUNCIONES BOTON CARRITO ---- */

// Funcion para habilitar el boton del Carrito:

export function habilitarBotonCarrito() {
    btnCarrito.disabled = false;
    btnCarrito.style.opacity = 1;
    btnCarrito.style.pointerEvents = 'auto';
}

// Funcion para deshabilitar el boton del Carrito:

export function deshabilitarBotonCarrito() {
    btnCarrito.disabled = true;
    btnCarrito.style.opacity = 0.5;
    btnCarrito.style.pointerEvents = 'none';
}

/* ---- FUNCIONES ICONO CARRITO ---- */

// Funcion para habilitar icono carrito:

export function habilitarIconoCarrito() {
    iconoCarrito.disabled = false;
    iconoCarrito.style.opacity = 1;
}

export function dehabilitarIconoCarrito() {
    iconoCarrito.disabled = false;
    iconoCarrito.style.opacity = 0.5;
}

/* ---- FUNCIONES BOTONES ABM PRODUCTOS ---- */

// Funcion ocultar botones Modificar/Eliminar Productos:

export function habilitarBotonesAgregarEditarEliminarProducto() {
    const btnEditarProducto = document.querySelectorAll('.btnEditProducto');
    const btnDeleteProducto = document.querySelectorAll('.btnDeleteProducto');
    if (nombreUsuarioLogueado.innerText === adminText) {
        btnEditarProducto.forEach((boton) => {
            boton.disabled = false;
            boton.style.display = 'block';
        });
        btnDeleteProducto.forEach((boton) => {
            boton.disabled = false;
            boton.style.display = 'block';
        });
        mnSectArtAdd.style.display = 'flex';
        btnAltaRepuesto.disabled = false;
        btnAltaRepuesto.style.display = 'block';
    }
}

//Funcion para deshabilitar los botones de edicion/eliminacion de Repuestos:

export function deshabilitarBotonesAgregarEditarEliminarProducto() {
    const btnEditarProducto = document.querySelectorAll('.btnEditProducto');
    const btnDeleteProducto = document.querySelectorAll('.btnDeleteProducto');
    if (nombreUsuarioLogueado.innerText !== adminText) {
        btnEditarProducto.forEach((boton) => {
            boton.disabled = true;
            boton.style.display = 'none';
        });
        btnDeleteProducto.forEach((boton) => {
            boton.disabled = true;
            boton.style.display = 'none';
        });
        btnAltaRepuesto.disabled = true;
        btnAltaRepuesto.style.display = 'none';
    }
}