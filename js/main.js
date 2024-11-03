/* --- IMPORTACIONES ---- */

import { Repuesto } from "./clases/repuesto.js";
import { Usuario } from "./clases/usuario.js";
import { altaUsuario, inicializarBaseDatosUsuario, recuperarUsuarioDeBD } from "./funciones-clases/funciones-usuario.js";

/* --- CONSTANTES Y VARIABLES ---- */

const loginButton = document.getElementById('btnLogin');
const sectionFormLogin = document.getElementById('hdNavSectionLogin');
const singUpButton = document.getElementById('btnSingUp');

/* ---- Modal Login ---- */

const modalLogin = document.getElementById('modalLogin');
const modalLoginNombreUsuario = document.getElementById('nombreUsuarioLogin');
const modalLoginPassword = document.getElementById('passwordLogin');
const modalBtnLogin = document.getElementById('btnModalLogin');

/* ---- Modal Sign Up ---- */

const modalSignUp = document.getElementById('exampleModal');
const modalInputNombre = document.getElementById('nombre');
const modalInputApellido = document.getElementById('apellido');
const modalInputEmail = document.getElementById('email');
const modalInputTelefono = document.getElementById('telefono');
const modalInputDireccion = document.getElementById('direccion');
const modalInputCiudad = document.getElementById('ciudad');
const modalInputProvincia = document.getElementById('provincia');
const modalInputPais = document.getElementById('pais');
const modalInputNombreUsuario = document.getElementById('nombreUsuarioModal');
const modalInputPassword = document.getElementById('password');
const modalInputConfirmarPassword = document.getElementById('confirmarPassword');
const modalSingUpButton = document.getElementById('btnModalSingUp');


const pUserName = document.getElementById('pUserName');
const botonesAgregarCarrito = document.querySelectorAll('.btnAgregarProductoCarrito');
const botonCarrito = document.getElementById('btnCarrito');
const iconoCarrito = document.getElementById('iconoCarrito');

// Se configuro repuestos como let porque con const no me trae los valores de cada repuesto
let repuestos = [];

const cerrarSesionText = "Cerrar Sesión";
const loginText = "Iniciar Sesión";
const invitadoText = "Usuario: Invitado";

/* ---- Creaciones de varios Productos ---- */

const repuesto1 = new Repuesto(1, "Retrovisores", 2011, "Astra", 123.55, 15, "https://http2.mlstatic.com/D_NQ_NP_707465-MLA75573563840_042024-O.webp");
const repuesto2 = new Repuesto(2, "Parabrisas", 2011, "Astra", 1000.00, 15, "https://http2.mlstatic.com/D_NQ_NP_814707-MLA75396323622_042024-O.webp");
const repuesto3 = new Repuesto(3, "Volante", 2011, "Astra", 750.99, 10, "https://http2.mlstatic.com/D_797387-MLA51898968943_102022-C.jpg");
const repuesto4 = new Repuesto(4, "Bujías x 4", 2011, "Astra", 250.55, 100, "https://http2.mlstatic.com/D_NQ_NP_960535-MLA31040323720_062019-O.webp");
const repuesto5 = new Repuesto(5, "Amortiguadores x 4", 2011, "Astra", 2500.55, 42, "https://http2.mlstatic.com/D_NQ_NP_607839-MLA78069070590_082024-O.webp");
const repuesto6 = new Repuesto(6, "Faro trasero conductor", 2011, "Astra", 450.55, 99, "https://http2.mlstatic.com/D_NQ_NP_622765-MLA70473923406_072023-O.webp");
const repuesto7 = new Repuesto(7, "Faro trasero acompañante", 2011, "Astra", 450.55, 99, "https://http2.mlstatic.com/D_NQ_NP_851015-MLA76872952329_062024-O.webp");
const repuesto8 = new Repuesto(8, "Puerta delantera acompañante", 2011, "Astra", 5000.75, 2, "https://http2.mlstatic.com/D_NQ_NP_2X_966711-MLA79026787319_092024-T.webp");

/* ---- Objetos ---- */

repuestos = [repuesto1, repuesto2, repuesto3, repuesto4, repuesto5, repuesto6, repuesto7, repuesto8];

/* -------------------------------- Funciones -------------------------------- */

/* ---------------- LOGIN ---------------- */

// Funcion para validar el nombre de usuario:

function validarUsuario(usuario) {
    //Validacion del usuario:
    const regexUsuario = /^[a-zA-Z]+$/;
    if (usuario.length > 0 && regexUsuario.test(usuario) == true) {
        return usuario;
    } else {
        usuario = "";
        return usuario;
    }
}

// Funcion para validar el password del usuario:

function validarPassword(password) {
    //Validacion del password:
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/;
    if (password.length > 0 && regexPassword.test(password) == true) {
        return password;
    } else {
        password = "";
        return password;
    }
}

// Funcion Validar el Login:

function validarLogin() {
    let usuarioValidado = validarUsuario(modalLoginNombreUsuario.value);
    let passwordValidado = validarPassword(modalLoginPassword.value);
    if (usuarioValidado === "" || passwordValidado === "") { alert("Error: El nombre de usuario y/o password no pueden ser nulos!"); }
    else {
        if (recuperarUsuarioDeBD(usuarioValidado, passwordValidado) === true ) {
            console.log("Usuario y password correcto!");
            //FALTA QUE RECUPERE EL CARRITO SI ESTA CREADO Y TODAVIA NO LO COMPRO!!!
            textoBotonLogin();
            mostarOcultarBotonSingUp();
            cambiarTextoUsuarioRegistrado(usuarioValidado);
            habilitarDeshabilitarBotonesEnLogin();  
            const modal = bootstrap.Modal.getInstance(modalLogin);
            modal.hide();
        } else {alert ("Error: Por favor verifique el nombre de usuario y/o password!");}
    }
}

// Funcion cambiar Texto al botón de Login:

function textoBotonLogin() {
    if (loginButton.textContent === loginText) {
        loginButton.textContent = cerrarSesionText;
        limpiarModalLogin();
    } else if (loginButton.textContent === cerrarSesionText) {
        loginButton.textContent = loginText;
        pUserName.textContent = invitadoText;
        mostarOcultarBotonSingUp();
    } else {
        alert("Error: No se pudo recuperar correctamente la información del botón Login!");
    }
}

// Funcion cambiar texto del usuario registrado:

function cambiarTextoUsuarioRegistrado(nombreUsuario) {
    if (pUserName.textContent === invitadoText) {
        pUserName.textContent = `Usuario: ${nombreUsuario.toLowerCase()}`;
    } else {
        pUserName.textContent = invitadoText;
    }
}

// Evento Login:

loginButton.addEventListener('click', () => {
    if (loginButton.textContent === loginText) {
        const nuevoModalLogin = new bootstrap.Modal(modalLogin);
        nuevoModalLogin.show();
    } else if (loginButton.textContent === cerrarSesionText) {
        textoBotonLogin();
        habilitarDeshabilitarBotonesEnLogin();
    } else { alert("Error: No se pudo procesar correctamente el evento del Click! Por favor intente nuevamente!");}
})

modalBtnLogin.addEventListener('click', () => {
    validarLogin();
});

// Funcion Limpiar Modal Login:

function limpiarModalLogin() {
    modalLoginNombreUsuario.value = "";
    modalLoginPassword.value = "";
}

// Funcion Habilitar botones de "Agregar" y del "Carrito":

function habilitarDeshabilitarBotonesEnLogin() {
    if (pUserName.textContent === invitadoText) {
        botonesAgregarCarrito.forEach((boton) => {
            boton.disabled = true;
            boton.style.opacity = 0.5;
        });
        botonCarrito.disabled = true;
        botonCarrito.style.opacity = 0.5;
        iconoCarrito.disabled = true;
        iconoCarrito.style.opacity = 0.5;
    }
    else {
        botonesAgregarCarrito.forEach((boton) => {
            boton.disabled = false;
            boton.style.opacity = 1;
        });
        botonCarrito.disabled = false;
        botonCarrito.style.opacity = 1;
        iconoCarrito.disabled = false;
        iconoCarrito.style.opacity = 1;
    }
}

/* ---------------- SING UP ---------------- */

// Funcion validar datos Sing up:

function validarSignUp() {
    const regexNombre = /^[a-zA-Z ]+$/;
    if (modalInputNombre.value.length > 0 && regexNombre.test(modalInputNombre.value)) {
        if (modalInputApellido.value.length > 0 && regexNombre.test(modalInputApellido.value)) {
            const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (modalInputEmail.value.length > 0 && regexEmail.test(modalInputEmail.value)) {
                const regexTelefono = /^\+?[0-9]{1,4}?[-.●\s]?\(?[0-9]{1,3}?\)?[-.●\s]?[0-9]{3,4}[-.●\s]?[0-9]{3,4}$/;
                if (modalInputTelefono.value.length > 0 && regexTelefono.test(modalInputTelefono.value)) {
                    const regexDireccion = /^[A-Za-z0-9\s]+$/;
                    if (modalInputDireccion.value.length > 0 && regexDireccion.test(modalInputDireccion.value)) {
                        if (modalInputCiudad.value.length > 0 && regexNombre.test(modalInputCiudad.value)) {
                            if (modalInputProvincia.value.length > 0 && regexNombre.test(modalInputProvincia.value)) {
                                if (modalInputPais.value.length > 0 && regexNombre.test(modalInputPais.value)) {
                                    const regexUsuario = /^[a-zA-Z]+$/;
                                    if (modalInputNombreUsuario.value.length > 0 && regexUsuario.test(modalInputNombreUsuario.value)) {
                                        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/;
                                    if (modalInputPassword.value.length > 0 && regexPassword.test(modalInputPassword.value)) {
                                        if (modalInputConfirmarPassword.value.length > 0 && regexPassword.test(modalInputConfirmarPassword.value)) {
                                            if (modalInputPassword.value === modalInputConfirmarPassword.value) {
                                                const nuevoUsuario =  new Usuario(
                                                    0, 
                                                    modalInputNombre.value,
                                                    modalInputApellido.value,
                                                    modalInputEmail.value,
                                                    modalInputTelefono.value,
                                                    modalInputDireccion.value,
                                                    modalInputCiudad.value,
                                                    modalInputProvincia.value,
                                                    modalInputPais.value,
                                                    modalInputNombreUsuario.value.toLowerCase(),
                                                    modalInputPassword.value,
                                                    false 
                                                );
                                                if (altaUsuario(nuevoUsuario) === true) {
                                                    limpiarDatosModalSingUp();
                                                    alert(`Felicidades! se ha dado de alta al usuario ${nuevoUsuario.nombreUsuario}!`);
                                                    const modal = bootstrap.Modal.getInstance(modalSignUp);
                                                    modal.hide();
                                                } else {}
                                            } else { alert("Error: Por favor, verifique su contraseña y la confirmación de su contraseña ya que no son iguales!"); }
                                        } else { alert(" Error: La confirmación de su contraseña no puede ser nula y/o tiene que tener al menos un número, una mayúscula y una minúscula!") }
                                    } else {alert("Error: Su contraseña no puede ser nula y/o tiene que tener al menos un número, una mayúscula y una minúscula!"); }
                                    } else { alert("Error: El Nombre de Usuario solo acepta letras, sin espacios, números ni caracteres especiales!");}                                  
                                } else { alert("Error: El Páis solo acepta letras y espacios!"); }
                            } else { alert("Error: La Provincia solos aceptas letras y espacios!"); }
                        } else { alert("Error: La Ciudad solo acepta letras y espacios!"); }
                    } else { alert("Error: La Dirección solo acepta letras, números y espacios!"); }
                } else { alert("Error: El Teléfono solo acepta números y dentro de un rango de 7 a 15 dígitos!"); }
            } else { alert("Error: El Email no es válido, por favor verifiquelo!"); }
        } else { alert("Error: El Apellido solo acepta letras y espacios!"); }
    } else { alert("Error: El Nombre solo acepta letras y espacios!"); }
}

// Boton Registrarse:

modalSingUpButton.addEventListener('click', () => {
    validarSignUp();
})

// Limpiar datos Modal Sing Up:

function limpiarDatosModalSingUp() {
    modalInputNombre.value = "";
    modalInputApellido.value = "";
    modalInputEmail.value = "";
    modalInputTelefono.value = "";
    modalInputDireccion.value = "";
    modalInputCiudad.value = "";
    modalInputProvincia.value = "";
    modalInputPais.value = "";
    modalInputNombreUsuario.value = "";
    modalInputPassword.value = "";
    modalInputConfirmarPassword.value = "";
}

// Ocultar / Mostrar boton Sing Up:

function mostarOcultarBotonSingUp() {
    if (loginButton.textContent === cerrarSesionText) {
        singUpButton.style.display = 'none';
    } else {
        singUpButton.style.display = 'block';
    }
}

/* ----- INVOCACIONES A FUNCIONES ----- */

inicializarBaseDatosUsuario();
