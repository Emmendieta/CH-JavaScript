//Clase de Repuesto:

import { Repuesto } from "./clases/repuesto.js"; 

/* --- Constantes y variables ---- */

const loginButton = document.getElementById('loginButton');
const pUserName = document.getElementById('pUserName');
const botonAgregarCarrito = document.getElementsByClassName('btnAgregarProductoCarrito');
const botonCarrito = document.getElementById('btnCarrito');

let usuario;
let password;

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

const repuestos = [repuesto1, repuesto2, repuesto3, repuesto4, repuesto5, repuesto6, repuesto7, repuesto8];

/* ---- Funciones ---- */

/* ---- LOGIN ---- */


// Funcion para solicitar el nombre de usuario:

function ingresarUsuario() {
    usuario = prompt("Por favor, ingrese su usuario (Recuerde que solo se pueden ingresar letras): ");
    //Valido con regex que solo sean letras:
    const regexUsuario  = /^[a-zA-Z]+$/;
    if (usuario.length > 0 && regexUsuario.test(usuario)) {
        return usuario;
    } else {
        alert ("Error: El nombre de usuario no puede ser nulo y solo puede contener letras!");
        ingresarUsuario();
    }
}

// Funcion para solicitar el password del usuario:

function ingresarPassword() {
    password = prompt("Por favor, ingrese su password: ");
    //Valido con regex que tenga al menos una mayuscula, una minuscula y al menos un número:
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/;
    if (password.length > 0 && regexPassword.test(password)) {
        return password;
    } else {
        alert("Error: Su contraseña no puede ser nula y/o tiene que tener al menos un número, una mayúscula y una minúscula!");
        ingresarPassword();
    } 
}

// Funcion habilitar boton "agregar a Carrito luego del login:"

function habilitarBotonAgregarCarrito() {
    for (let i = 0; i < botonAgregarCarrito.length; i++) {
        botonAgregarCarrito[i].style.pointerEvents = 'auto';
        botonAgregarCarrito[i].style.opacity = '1';
    }
}

// Funcion habilitar boton "Finalizar Carrito luego del login":

function habilitarBotonFinalizarCarrito() {
    botonCarrito.style.pointerEvents = 'auto';
    botonCarrito.style.opacity = '1';
}

/* ---- LOGOUT ---- */

// Funcion para realizar el logout:

function logOut() {
    let valirPassword = prompt("Por favor, ingrese nuevamente su password para verificar su identidad: ");
    while (valirPassword != password) {
        alert("Error: La contraseña ingresada no es válida! Por favor, intente nuevamente: ");
        valirPassword = prompt("Por favor, ingrese nuevamente su password para verificar su identidad: ");
    }
    return true;
}

// Funcion deshabilitar boton "agregar a Carrito luego del logout:"

function deshabilitarBotonAgregarCarrito() {
    for (let i = 0; i < botonAgregarCarrito.length; i++) {
        botonAgregarCarrito[i].style.pointerEvents = 'none';
        botonAgregarCarrito[i].style.opacity = '0.5';
    }
}

// Funcion deshabilitar boton "Finalizar Carrito luego del login":

function deshabilitarBotonFinalizarCarrito() {
    botonCarrito.style.pointerEvents = 'none';
    botonCarrito.style.opacity = '0.5';
}

// Funcion para cuando se hace click el botón Login:

loginButton.addEventListener('click', () => {
    
    //En caso de que no este logueado:

    if (loginButton.textContent == loginText) {
        usuario = ingresarUsuario();
        password = ingresarPassword();
        pUserName.textContent = "usuario: " + usuario;
        loginButton.textContent = cerrarSesionText;
        habilitarBotonAgregarCarrito();
        habilitarBotonFinalizarCarrito();
        // Mostrar por consola el nombre de usuario:
        console.log(usuario);
        // Mostrar por consola el password del usuario:
        console.log(password);

    //En caso de que este logueado y quiera cerrar sesión:

    } else if (loginButton.textContent == cerrarSesionText) {
        let validacion = confirm("Esta seguro de que quiere cerrar sesión?");

        //Validar que quiere Cerrar Sesión:

        if (validacion == true) {
            if (logOut() == true) {
                loginButton.textContent = loginText;
                pUserName.textContent = invitadoText;
                deshabilitarBotonAgregarCarrito();
                deshabilitarBotonFinalizarCarrito();
                alert("Ok, cerrando sesión. ¡Hasta Luego!");
            }
        }
        else {
            alert("Ok, no se cerrará la sesión hasta que confirme!");
        }
    }
    else {
        alert("Error: No se pudo se pudo recuperar la información correctamente, por favor, recargue la página nuevmanete!");
    }
})

/* ---- AGREGAR PRODDCTOS A CARDS ---- */

// Funcion para agregar los productos a las cards:

function agregarRepuestosACards (repuestos) {

    let index = 0;

    for (const agregarRepuesto of repuestos) {

        document.getElementById(`codigoRepuesto${index}`).textContent = `Código: ${agregarRepuesto.codigo}`;
        document.getElementById(`nombreRepuesto${index}`).textContent = `${agregarRepuesto.nombre}`;
        document.getElementById(`vehiculoRepuesto${index}`).textContent = `Vehículo: ${agregarRepuesto.vehiculo}`;
        document.getElementById(`modeloRepuesto${index}`).textContent = `Modelo: ${agregarRepuesto.modelo}`;
        document.getElementById(`precioRepuesto${index}`).textContent = `Precio: $`+ agregarRepuesto.precio;
        document.getElementById(`cantidadRepuesto${index}`).textContent = `Cantidad: ${agregarRepuesto.cantidad}`;
        //Agregando imagen al producto:
        const imagenElemento = document.getElementById(`imgRepuesto${index}`);
        imagenElemento.src = agregarRepuesto.imagen;
        imagenElemento.alt = agregarRepuesto.nombre;
        index++;
    }
}

// Invocando a la función agregarRepuestosACards:

agregarRepuestosACards(repuestos);

// Mostrar por consola el arrays de productos:

console.log(repuestos);
