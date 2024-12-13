import { mostrarModal, ocutalModal } from "../elementos-html/main-html/modales-html/funciones-modal.js";
import { crearContenidoModalLogin } from "../elementos-html/main-html/modales-html/modal-login.js";
import { cambiarTextoUsuarioLogueado, ocultarBotonSingUp, cambiarNombreBotonLoginIniciarSesion, mostrarBotonSingUp, cambiarNombreBotonLoginCerrarSesion, 
        cambiarTextoUsuarioInvitado } from "../elementos-html/header-html/header.js";
import { confirmSweetAlert2, errorSweetAlert2, pendingSweetAlert2 } from "../sweet-alert-2/funciones-sweet-alert-2.js";
import { demora1000, demoraCargarUsuario, invitadoText, loginText } from "../variables-constantes/var-const.js";
import { baseDeDatosUsuario } from "../base-datos/bd-usuarios.js";
import { Usuario } from "../clases/usuario.js";
import { deshabilitarBotonesAgregarEditarEliminarProducto, deshabilitarBotonesAgregarProductoACarrito, habilitarBotonesAgregarEditarEliminarProducto,
    habilitarBotonesAgregarProductoACarrito } from "../elementos-html/main-html/repuestos-html.js";
import { actualizarGloboCantidad, dehabilitarIconoCarrito, deshabilitarBotonCarrito, deshabilitarGloboCantidad, habilitarBotonCarrito, 
    habilitarIconoCarrito } from "../elementos-html/main-html/carrito-html.js";
import { devuelveListaRepuestosDeCarritoPendiente } from "./funciones-carrito.js";

export function fetchUsuarios() {
        return fetch('')
        .then(() => inicializarBaseDatosUsuario())
        .then(() => JSON.parse(localStorage.getItem("baseDeDatosUsuario")))
        .catch((error) => {
            errorSweetAlert2("Error al obtener usuarios: " + error);
            throw error;
        });
}

// Inicializar la Base de Datos con el usuario con rol de admin:

export async function inicializarBaseDatosUsuario() {
    try {
        const recuperarBaseDeDatos = JSON.parse(localStorage.getItem("baseDeDatosUsuario"));
        if (!recuperarBaseDeDatos || recuperarBaseDeDatos.length === 0) {
            const adminUsuario = new Usuario(
                1,
                "Admin",
                "Admin",
                "emmendieta@issys.gov.ar",
                2804238041,
                "Brown 274",
                "Trelew",
                "Chubut",
                "Argentina",
                "admin",
                "Admin1234",
                true
            );
            baseDeDatosUsuario.push(adminUsuario);
            localStorage.setItem("baseDeDatosUsuario", JSON.stringify(baseDeDatosUsuario));
        }
    } catch (error) { errorSweetAlert2("No se pudo inicializar la Base de Datos correctamente. Error: " + error); }
}

async function devuelveBDUsuarios() {
    try {
        let recuperarBaseDeDatos = JSON.parse(localStorage.getItem("baseDeDatosUsuario"));
        if (recuperarBaseDeDatos === null || recuperarBaseDeDatos === undefined) { 
            await inicializarBaseDatosUsuario(); 
            recuperarBaseDeDatos = JSON.parse(localStorage.getItem("baseDeDatosUsuario"));
        }
        return recuperarBaseDeDatos;
    } catch(error) { errorSweetAlert2("Error al tratar de devolver la Base de Datos de los usuarios! Error: " + error); }
    finally {}    
}

// Guardar un nuevo usuario:

export async function altaUsuario(usuario) {
    try {
        const baseDeDatosUsuario = await fetchUsuarios(); 
        const existeUsuario = verificarExistenciaUsuario(usuario, baseDeDatosUsuario);
        if (!existeUsuario) {
            const maxCodigo = obtenerCodigoMax(baseDeDatosUsuario) + 1;
            const nuevoUsuario = new Usuario(
                usuario.codigo = maxCodigo,
                usuario.nombre,
                usuario.apellido,
                usuario.email,
                parseInt(usuario.telefono),
                usuario.direccion,
                usuario.ciudad,
                usuario.provincia,
                usuario.pais,
                usuario.nombreUsuario.toLowerCase(),
                usuario.password,
                usuario.esAdmin
            );
            baseDeDatosUsuario.push(nuevoUsuario);
            localStorage.setItem("baseDeDatosUsuario", JSON.stringify(baseDeDatosUsuario));
            return true;
        } else {
            errorSweetAlert2("Error: El nombre de usuario ya existe o el email ya está registrado!");
            return false;
        }
    } catch (error) { errorSweetAlert2("Error inesperado en alta de usuario: " + error); }
}

// Verificar si existe un Usuario:

function verificarExistenciaUsuario(usuario, baseDeDatosUsuario) {
    try {
        if (!usuario.email) { throw new Error("Formato de Email inválido"); }
        const regexUsuario = /^[a-zA-Z]+$/;
        if (!usuario.nombreUsuario || !regexUsuario.test(usuario.nombreUsuario)) { throw new Error("Formato del Nombre de Usuario inválido"); }
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/;
        if (!usuario.password || !regexPassword.test(usuario.password)) { throw new Error("Formato del Password inválido");}
        if (usuario.nombreUsuario === "admin") { throw new Error("No se puede crear un usuario con privilegios de Administrador"); }
        const existeNombre = baseDeDatosUsuario.some((usuarioBuscado) => usuarioBuscado.nombreUsuario === usuario.nombreUsuario);
        const existeEmail = baseDeDatosUsuario.some((usuarioBuscado) => usuarioBuscado.email === usuario.email);
        return existeNombre || existeEmail;
    } catch (error) {
        errorSweetAlert2("Error al verificar usuario: " + error.message);
        return false;
    }
}

// Obtener el codigo Maximo:

function obtenerCodigoMax(baseDeDatosUsuario) {
    try {
        if (!baseDeDatosUsuario || baseDeDatosUsuario.length === 0) { throw new Error("Base de datos vacía"); }
        return Math.max(...baseDeDatosUsuario.map((usuarioBuscado) => usuarioBuscado.codigo)); 
    } catch (error) {
        errorSweetAlert2("Error al obtener el código máximo: " + error.message); 
        return 0;
    }
}

// Recuperar un usuario determinado con su nombre y password:

export async function recuperarUsuarioDeBD(usuario, password) {
    try {
        const baseDeDatosUsuario = await fetchUsuarios();
        const usuarioEncontrado = baseDeDatosUsuario.find((usuarioBuscado) => usuarioBuscado.nombreUsuario === usuario.toLowerCase());
        if (usuarioEncontrado && usuarioEncontrado.password === password) { return usuarioEncontrado;
        } else { throw new Error("Usuario o contraseña incorrectos"); }
    } catch (error) { throw new Error("Error en recuperación de usuario: " + error.message); }
}

// Recupero el Codigo Logueado con nombre usuario:

export async function devolverCodigoUsuario(usuario) {
    try {
        const recuperarBaseDeDatos = await devuelveBDUsuarios();
        if (recuperarBaseDeDatos.length === 0) { return false; }
        else {
            const usuarioEncontrado = recuperarBaseDeDatos.find((elemento) => elemento.nombreUsuario === usuario.toLowerCase());
            if (usuarioEncontrado !== undefined) {
                if (usuarioEncontrado.nombreUsuario === usuario.toLowerCase()) { return usuarioEncontrado.codigo; }
                else { return -1; }
            } else { return -1; }
        }
    } catch (error) { errorSweetAlert2("Error Inesperado al devolver el código de Usuario. Error: " + error); }
    finally {}
}  

/* ---------------- LOGIN ---------------- */

// Funcion para que en el caso de que no se haya iniciado sesion, se muestra el Modal Login:

export function iniciarLogin() {
    try {
        if (btnLogin.textContent === loginText) {
            crearContenidoModalLogin();
            const modalLogin = document.getElementById('modalLogin')
            mostrarModal(modalLogin);
        }
    } catch (error) { errorSweetAlert2("Error: Inesperado. Error: " + error);}
    finally {}
}

// Usuario y Password validado e Inicio de Sesión:

export async function validarDatosIngresados() {
    try {
        const modalLoginNombreUsuario = document.getElementById('nombreUsuarioLogin');
        const modalLoginPassword = document.getElementById('passwordLogin');
        const usuarioValidado = validarUsuario(modalLoginNombreUsuario.value);
        const passwordValidado = validarPassword(modalLoginPassword.value);
        if (!usuarioValidado || !passwordValidado) { throw new Error("Nombre de usuario y/o password inválidos"); }
        const usuarioEncontrado = await recuperarUsuarioDeBD(usuarioValidado, passwordValidado);
        if (usuarioEncontrado) {
            cambiarTextoUsuarioLogueado(usuarioValidado);
            ocultarBotonSingUp();
            cambiarNombreBotonLoginIniciarSesion();
            habilitarBotonCarrito();
            habilitarIconoCarrito();
            ocutalModal('modalLogin');
            habilitarBotonesAgregarEditarEliminarProducto();
            habilitarBotonesAgregarProductoACarrito();
            const codigoUsuario = usuarioEncontrado.codigo;
            await devuelveListaRepuestosDeCarritoPendiente(codigoUsuario);
            await actualizarGloboCantidad(usuarioEncontrado.nombreUsuario);
            pendingSweetAlert2(usuarioEncontrado.nombreUsuario, demoraCargarUsuario);
        }
    } catch (error) { errorSweetAlert2("Error inesperado en validación: " + error.message); }
}

// Función para validar Nombre de Usuario:

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

//Funcion para validar el Password del usuario:

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

/* ---------------- LOGOUT ---------------- */

// Funcion cerrar Sesion:

export async function cerrarSesion() {
    try {
        const nombreUsuarioLogueado = document.getElementById('pUserName');
        if (nombreUsuarioLogueado.innerText !== invitadoText) {
            pendingSweetAlert2(`Cierre de sesión del usuario ${nombreUsuarioLogueado.innerText}`, demora1000);
            await iniciarCierreSesion();
            confirmSweetAlert2("Cierre de Sesión:", "Sesión cerrada correctamente!"); 
        }
    } catch(error) { errorSweetAlert2("Error inesperado al intentar cerrar sesión. Error: "+ error); }
    finally {}
}

function iniciarCierreSesion() {
    return new Promise((resuelto) => {
        setTimeout(() => {
            try {
                mostrarBotonSingUp();
                cambiarNombreBotonLoginCerrarSesion();
                cambiarTextoUsuarioInvitado();
                deshabilitarBotonCarrito();
                dehabilitarIconoCarrito();
                deshabilitarBotonesAgregarEditarEliminarProducto();
                deshabilitarBotonesAgregarProductoACarrito(); 
                deshabilitarGloboCantidad();
                resuelto();
            } catch (error) {errorSweetAlert2("Error inesperado al iniciar el cierre de sesión. Error:" + error); }
        }, demora1000);
    });
}

/* ---------------- SING UP ---------------- */

export async function validarSignUp() {
    try {
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
                                                        const nuevoUsuario = new Usuario(
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
                                                        const resultadoAlta = await altaUsuario(nuevoUsuario);
                                                        if (resultadoAlta === true) {
                                                            ocutalModal('modalSingUp');
                                                            const texto = `Felicidades! se ha dado de alta al usuario: "${nuevoUsuario.nombreUsuario}"!`
                                                            confirmSweetAlert2("Exito:", texto);
                                                        } else { }
                                                    } else { errorSweetAlert2("Error: Por favor, verifique su contraseña y la confirmación de su contraseña ya que no son iguales!"); }
                                                } else { errorSweetAlert2(" Error: La confirmación de su contraseña no puede ser nula y/o tiene que tener al menos un número, una mayúscula y una minúscula!") }
                                            } else { errorSweetAlert2("Error: Su contraseña no puede ser nula y/o tiene que tener al menos un número, una mayúscula y una minúscula!"); }
                                        } else { errorSweetAlert2("Error: El Nombre de Usuario solo acepta letras, sin espacios, números ni caracteres especiales!"); }
                                    } else { errorSweetAlert2("Error: El Páis solo acepta letras y espacios!"); }
                                } else { errorSweetAlert2("Error: La Provincia solos aceptas letras y espacios!"); }
                            } else { errorSweetAlert2("Error: La Ciudad solo acepta letras y espacios!"); }
                        } else { errorSweetAlert2("Error: La Dirección solo acepta letras, números y espacios!"); }
                    } else { errorSweetAlert2("Error: El Teléfono solo acepta números y dentro de un rango de 7 a 15 dígitos!"); }
                } else { errorSweetAlert2("Error: El Email no es válido, por favor verifiquelo!"); }
            } else { errorSweetAlert2("Error: El Apellido solo acepta letras y espacios!"); }
        } else { errorSweetAlert2("Error: El Nombre solo acepta letras y espacios!"); }
    } catch (error) { errorSweetAlert2 ("Error inesperado. Error: " + error); }
    finally {}
}

