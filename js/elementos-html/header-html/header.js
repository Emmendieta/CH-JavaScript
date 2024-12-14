/* ---------------- IMPORTACIONES ---------------- */

import { cerrarSesion, iniciarLogin } from "../../funciones/funciones-usuario.js";
import { errorSweetAlert2 } from "../../sweet-alert-2/funciones-sweet-alert-2.js";
import { invitadoText, loginText, cerrarSesionText, btnTextBuscarBuscar, btnTxtBuscarLimpiar, adminText, dobleDemoraCargarRepuestos } from "../../variables-constantes/var-const.js";
import { iniciarSingUp } from "../main-html/modales-html/modal-sing-up.js";
import { crearContenidoRepuestoBottom, habilitarBotonesAgregarEditarEliminarProducto, habilitarBotonesAgregarProductoACarrito } from "../main-html/repuestos-html.js";

/* ---------------- AGREGAR CONTENIDO AL HEADER ---------------- */

export function crearContenidoEnHeader() {
    const contenedorHeader = document.getElementById('header');
    //Verifico si lo tengo que eliminar y recargar:
    const contenidoHeader = document.getElementById('hdNavBar');
    if (contenidoHeader) { contenidoHeader.remove(); }
    //Creo el navbar:
    const navbarContainter = document.createElement('nav');
    navbarContainter.innerHTML = '';
    navbarContainter.classList.add('navbar', 'navbar-expand-lg', 'bg-body-tertiary');
    navbarContainter.id = 'hdNavBar';
    navbarContainter.setAttribute('data-bs-theme', 'dark');
    //Contenido del navbar:
    navbarContainter.innerHTML = `
            <div class="container-fluid">
                <section>
                    <a class="navbar-brand" href="#"><img src="images/logo-chevrolet.png" alt="logoChevrolet" class="hdNavSectImgLogo"></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </section>
                <section>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Buscar Por Nombre" aria-label="Search" id="textoBuscadorRepuesto">
                        <button class="btn btn-outline-success" type="submit" id="btnBuscarRepuesto">Buscar</button>
                    </form>
                </section>
                <section id="hdNavSectionLogin">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <button class="btn btn-outline-success" id="btnLogin" type="button">Iniciar Sesión</button>
                        <button type="button" class="btn btn-outline-success" id="btnRegistrarse" data-bs-toggle="modal" data-bs-target="#exampleModal">Registrarse</button>
                        <p id="pUserName">Usuario: Invitado</p>
                    </div>
                </section>
            </div>
    `;
    //Agrego el contenido del navbar al html:
    contenedorHeader.appendChild(navbarContainter);
    const btnLogin = navbarContainter.querySelector(`#btnLogin`);
    const btnRegistrarse = navbarContainter.querySelector('#btnRegistrarse');
    const pUserName = document.getElementById('pUserName');
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
    // Evento de Filtar Repuestos:
    const btnBuscarProducto = navbarContainter.querySelector(`#btnBuscarRepuesto`);
    btnBuscarProducto.addEventListener('click', (event) => {
        if (btnBuscarProducto.textContent === btnTextBuscarBuscar) {
            const textoBuscadorRepuesto = navbarContainter.querySelector('#textoBuscadorRepuesto');
            if (textoBuscadorRepuesto.value === "") { 
                event.preventDefault();
                errorSweetAlert2("Error: No se puede buscar un Repuesto por un nombre nulo!"); 
            }
            else if (textoBuscadorRepuesto.value !== "") {
            //Evita que se recargue la pagina de forma completa!
            event.preventDefault();
            //Filta los elementos buscados con la funcion:
            crearContenidoRepuestoBottom(2);
            setTimeout(() => {
                const nombreUsuarioLogueado = document.getElementById('pUserName');
                if (nombreUsuarioLogueado.textContent !== invitadoText) {
                    habilitarBotonesAgregarProductoACarrito();
                    if (nombreUsuarioLogueado.innerText === adminText) { habilitarBotonesAgregarEditarEliminarProducto(); }
                }}, dobleDemoraCargarRepuestos);
            }
        } else if (btnBuscarProducto.textContent === btnTxtBuscarLimpiar) {
            //Evita que se recargue la pagina de forma completa!
            event.preventDefault();
            //Trae la lista original:
            crearContenidoRepuestoBottom(1);
            //Cambia el texto del boton buscar para que pueda realizar otra búsqueda:
            btnBuscarProducto.textContent = btnTextBuscarBuscar;
            const textoBuscadorRepuesto = navbarContainter.querySelector('#textoBuscadorRepuesto');
            textoBuscadorRepuesto.value = "";
            setTimeout(() => {
                const nombreUsuarioLogueado = document.getElementById('pUserName');
                if (nombreUsuarioLogueado.textContent !== invitadoText) {
                    habilitarBotonesAgregarProductoACarrito();
                    if (nombreUsuarioLogueado.innerText === adminText) { habilitarBotonesAgregarEditarEliminarProducto(); }
                }}, dobleDemoraCargarRepuestos);
        }
    });
    // Evento para Registrarse:
    btnRegistrarse.addEventListener('click', () => { iniciarSingUp(); });
    }    

// Funcion cambiar el texto del boton login cuando se cierra sesion:

export function cambiarNombreBotonLoginCerrarSesion() {
    try {
        const btnLogin = document.getElementById('btnLogin');
        if (btnLogin.textContent === cerrarSesionText) { btnLogin.textContent = loginText; }
    } catch (error) {errorSweetAlert2 ("Error Inesperado. Error: " + error);}
    finally {}    
}

// Funcion cambiar el texto del usuario registrado:

export function cambiarTextoUsuarioLogueado(nombreUsuario) {
    try {
    //Si el texto es "Usuario: Invitado, lo cambia:"
    const nombreUsuarioLogueado = document.getElementById('pUserName');
    if (nombreUsuarioLogueado.textContent === invitadoText) {
        nombreUsuarioLogueado.textContent = `Usuario: ${nombreUsuario.toLowerCase()}`;
    }
    } catch (error) {errorSweetAlert2 ("Error Inesperado. Error: " + error);}
    finally {}
}

export function mostrarBotonSingUp() {
    try {
        const btnLogin = document.getElementById('btnLogin');
        if (btnLogin.textContent === cerrarSesionText) {
            const singUpButton = document.getElementById('btnRegistrarse');
            singUpButton.style.display = 'block';
        };
    } catch (error) {errorSweetAlert2("Error Inesperado. Error: " + error);}
    finally {}
}

// Funcion ocultar Boton Registrarse:

export function ocultarBotonSingUp() {
    try {
        const btnLogin = document.getElementById('btnLogin');
        if (btnLogin.textContent === loginText) {
            const singUpButton = document.getElementById('btnRegistrarse');
            singUpButton.style.display = 'none';
        };
    } catch (error) {errorSweetAlert2("Error Inesperado. Error: " + error);}
    finally {}
}

//Funcion para cambiar el texto del Boton login si se inicio sesion:

export function cambiarNombreBotonLoginIniciarSesion() {
    try {
        const btnLogin = document.getElementById('btnLogin');
        if (btnLogin.textContent === loginText) { btnLogin.textContent = cerrarSesionText; }
    } catch (error) {errorSweetAlert2("Error Inesperado. Error: " + error);}
    finally {}
}

// Funcion para volver al texto original de usuario invitado:

export function cambiarTextoUsuarioInvitado() {
    try {
        const nombreUsuarioLogueado = document.getElementById('pUserName');
        nombreUsuarioLogueado.textContent = invitadoText;
    } catch (error) {errorSweetAlert2("Error Inesperado. Error: " + error);}
    finally {}    
}