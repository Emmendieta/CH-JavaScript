/* --- IMPORTACIONES ---- */

import { Repuesto } from "./clases/repuesto.js";
import { Usuario } from "./clases/usuario.js";
import { altaUsuario, inicializarBaseDatosUsuario, recuperarUsuarioDeBD } from "./funciones-clases/funciones-usuario.js";
import { recuperarBDRepuestos, listarRepuestos, listarRepuestosConFiltro } from "./funciones-clases/funciones-repuesto.js";

/* --- CONSTANTES Y VARIABLES ---- */

const loginButton = document.getElementById('btnLogin');
const sectionFormLogin = document.getElementById('hdNavSectionLogin');
const singUpButton = document.getElementById('btnSingUp');
const contenedorRepuestos = document.querySelector('.mnSectArtRepuestos');
const btnBuscarProducto = document.getElementById('btnBuscarRepuesto');

//listarRepuestos
const listaRepuestos = listarRepuestos();
/* const btnEditarProducto = document.getElementsByClassName('btnEditProducto');
const btnEliminarProducto = document.getElementsByClassName('btnDeleteProducto'); */


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

const cerrarSesionText = "Cerrar Sesión";
const loginText = "Iniciar Sesión";
const invitadoText = "Usuario: Invitado";
const btnTextBuscarBuscar = "Buscar";
const btnTxtBuscarLimpiar = "Limpiar";

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
        if (recuperarUsuarioDeBD(usuarioValidado, passwordValidado) === true) {
            console.log("Usuario y password correcto!");
            //FALTA QUE RECUPERE EL CARRITO SI ESTA CREADO Y TODAVIA NO LO COMPRO!!!
            textoBotonLogin();
            mostarOcultarBotonSingUp();
            cambiarTextoUsuarioRegistrado(usuarioValidado);
            habilitarDeshabilitarBotonesEnLogin();
            deshabilitarBotonesEdicionEliminarProductos();
            const modal = bootstrap.Modal.getInstance(modalLogin);
            modal.hide();
        } else { alert("Error: Por favor verifique el nombre de usuario y/o password!"); }
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
        deshabilitarBotonesEdicionEliminarProductos();
    } else { alert("Error: No se pudo procesar correctamente el evento del Click! Por favor intente nuevamente!"); }
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
    const habillitarBotonesAgregarCarrito = document.querySelectorAll('.btnAgregarProductoCarrito');

    if (pUserName.textContent === invitadoText) {

        habillitarBotonesAgregarCarrito.forEach((boton) => {
            boton.disabled = true;
            boton.style.opacity = 0.5;
            boton.style.pointerEvents = "none";
        });
        botonCarrito.disabled = true;
        botonCarrito.style.opacity = 0.5;
        botonCarrito.style.pointerEvents = "none";
        iconoCarrito.disabled = true;
        iconoCarrito.style.opacity = 0.5;
    }
    else {
        habillitarBotonesAgregarCarrito.forEach((boton) => {
            boton.disabled = false;
            boton.style.opacity = 1;
            boton.style.pointerEvents = "auto";
        });
        botonCarrito.disabled = false;
        botonCarrito.style.opacity = 1;
        botonCarrito.style.pointerEvents = "auto";
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
                                                    if (altaUsuario(nuevoUsuario) === true) {
                                                        limpiarDatosModalSingUp();
                                                        alert(`Felicidades! se ha dado de alta al usuario ${nuevoUsuario.nombreUsuario}!`);
                                                        const modal = bootstrap.Modal.getInstance(modalSignUp);
                                                        modal.hide();
                                                    } else { }
                                                } else { alert("Error: Por favor, verifique su contraseña y la confirmación de su contraseña ya que no son iguales!"); }
                                            } else { alert(" Error: La confirmación de su contraseña no puede ser nula y/o tiene que tener al menos un número, una mayúscula y una minúscula!") }
                                        } else { alert("Error: Su contraseña no puede ser nula y/o tiene que tener al menos un número, una mayúscula y una minúscula!"); }
                                    } else { alert("Error: El Nombre de Usuario solo acepta letras, sin espacios, números ni caracteres especiales!"); }
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


/* ---------------- REPUESTOS ---------------- */

// Funcion cargar lista de Repuestos:

function mostrarRepuestos(lista) {

    //Limpio la Lista de Repuestos;
    contenedorRepuestos.innerHTML = '';
    //Recorro la lista de Repuestos:
    lista.forEach((repuesto, indice) => {
        //Creo una tarjeta por cada Repuesto que hay en la BD:
        const tarjetaEnHTML = `
            <div class="card" style="width: 18rem;">
                <div class="d-flex justify-content-center">
                    <img src="${repuesto.imagen} || images/Imagen-no-disponible.png" class="card-img-top" id="imgRepuesto${indice}"
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
        habilitarDeshabilitarBotonesEnLogin();
        deshabilitarBotonesEdicionEliminarProductos();
    });
}

// Listar Repuestos con filtro:

function repuestosConFiltro() {
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
            mostrarRepuestos(listaFiltrada);
        }
    }
}

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
        mostrarRepuestos(listaRepuestos)
        //Cambia el texto del boton buscar para que pueda realizar otra búsqueda:
        btnBuscarProducto.textContent = btnTextBuscarBuscar;    
    }
})



/* ---------------- BOTON ALTA - EDICION - ELIMINAR PRODUCTOS ---------------- */

// Funcion ocultar botones de Edicion y eliminar Productos:

function deshabilitarBotonesEdicionEliminarProductos() {
    const btnEditarProducto = document.querySelectorAll('.btnEditProducto');
    const btnDeleteProducto = document.querySelectorAll('.btnDeleteProducto');
    const mnSectArtAdd = document.querySelector('.mnSectArtAdd');
    if (pUserName.innerText === "Usuario: admin") {
        btnEditarProducto.forEach(boton => {
            boton.disabled = false;
            boton.style.display = 'block';
        });
        btnDeleteProducto.forEach(boton => {    
            boton.disabled = false;
            boton.style.display = 'block';
        });
        mnSectArtAdd.style.display = 'flex';
    } else {
        btnEditarProducto.forEach(boton => {
            boton.disabled = true;
            boton.style.display = 'none';
        });
        btnDeleteProducto.forEach(boton => {
            boton.disabled = true;
            boton.style.display = 'none';
        });
        mnSectArtAdd.style.display = 'none';
    }

}





/* ----- INVOCACIONES A FUNCIONES ----- */

inicializarBaseDatosUsuario();
recuperarBDRepuestos();
mostrarRepuestos(listaRepuestos);