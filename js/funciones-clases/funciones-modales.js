import { Usuario } from "../clases/usuario.js";
import { Repuesto } from "../clases/repuesto.js";
import { altaUsuario } from "./funciones-usuario.js";
import { altaRepuesto, mostrarRepuestos, editarRepuesto , eliminarRepuesto} from "./funciones-repuesto.js";
import { habilitarBotonesAgregarProductoACarrito } from "./funciones-validaciones.js";

/* ---------------- VARIABLES Y CONSTANTES ---------------- */

/* ---- Modal Login ---- */

const modalLogin = document.getElementById('modalLogin');
const modalLoginNombreUsuario = document.getElementById('nombreUsuarioLogin');
const modalLoginPassword = document.getElementById('passwordLogin');

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
const textModificarRepuesto = "Modificar Repuesto";
const textRestablecerRepuesto = "Alta Repuesto";
const textEliminarRepuesto = "Eliminar Repuesto";


/* ---------------- FUNCIONES ---------------- */

// Funcion Mostrar Modal:

export function mostrarModal(nombreModal) {
    const modal = new bootstrap.Modal(nombreModal); 
    modal.show();
}

// Funcion Ocultar Modal:

export function ocutalModal(nombreModal) {
    const modal = bootstrap.Modal.getInstance(nombreModal);
    modal.hide();
}

/* ---- Funciones Modal Login ---- */

export function limpiarModalLogin() {
    modalLoginNombreUsuario.value = "";
    modalLoginPassword.value = "";
}

/* ---------------- SING UP ---------------- */

// Funcion validar datos Sing up:

export function validarSignUp() {
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
                                                        ocutalModal(modalSignUp);
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

// Limpiar datos Modal Sing Up:

export function limpiarDatosModalSingUp() {
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

/* ---------------- ALTA DE REPUESTO ---------------- */

// Funcion para Validar datos del Repuesto:

function validarAltaProducto() {
    const regexCodigoRepuesto = /^\d{8}$/;
    if (modalRepuestoCodigoRepuesto.value.length > 0 && regexCodigoRepuesto.test(modalRepuestoCodigoRepuesto.value)) {
        const regexNombre = /^[a-zA-Z ]+$/;
        if (modalRepuestoNombre.value.length > 0 && regexNombre.test(modalRepuestoNombre.value)) {
            const regexModelo = /^[0-9]+$/;
            if (modalRepuestoModelo.value.length > 0 && parseInt(modalRepuestoModelo.value) > 1800 && regexModelo.test(modalRepuestoModelo.value)) {
                if (modalRepuestoVehiculo.value.length > 0 && regexNombre.test(modalRepuestoVehiculo.value)) {
                    const regexPrecio = /^\d+(\.\d{2})?$/;
                    if (modalRepuestoPrecio.value.length > 0 && parseFloat(modalRepuestoPrecio.value) > 0 && regexPrecio.test(modalRepuestoPrecio.value)) {
                            if (modalRepuestoCantidad.value.length > 0 && parseInt(modalRepuestoCantidad.value) > 0 && regexModelo.test(modalRepuestoCantidad.value)) {
                            if (modalRepuestoImagen.value === "") {
                                //En caso de que no establezca una url de la imagen:
                                const recursoImagen = "https://github.com/Emmendieta/CH-JavaScript/blob/main/images/Imagen-no-disponible.png?raw=true";
                                const nuevoRepuestoSinImagen = new Repuesto (0, modalRepuestoCodigoRepuesto.value, modalRepuestoNombre.value, modalRepuestoModelo.value, modalRepuestoVehiculo.value, modalRepuestoPrecio.value, modalRepuestoCantidad.value, recursoImagen);
                                console.log(nuevoRepuestoSinImagen);
                                return nuevoRepuestoSinImagen;
                            } else {
                                //En caso de que establezca una url de la imgen:
                                const nuevoRepuesto = new Repuesto (0, modalRepuestoCodigoRepuesto.value, modalRepuestoNombre.value, modalRepuestoModelo.value, modalRepuestoVehiculo.value, modalRepuestoPrecio.value, modalRepuestoCantidad.value, modalRepuestoImagen.value);
                                console.log(nuevoRepuesto);
                                return nuevoRepuesto;
                            };
                        } else { alert("Error: La cantidad del Repuesto no puede ser nula y solo acepta valores enteros positivos!"); }
                    } else { alert("Error: El precio no puede ser nulo y solo toma valores positivos y con 2 decimales. Ej. 1000.58"); }
                } else { alert("Error: El nombre del vehículo no puede ser nulo y solo toma palabras!"); }
            } else { alert("Error: El Modelo del Repuesto no puede ser nulo y solo toma valores numéricos mayores a 1800!"); }
        } else { alert("Error: El Nombre del Repuesto no puede ser nulo, y solo acepta palabras sin caraceteres especiales!"); }      
    } else { alert("Error: El Código del Repuesto no puede ser nulo, y solo toma valores numericos de 8 dígitos sin espacios, letras, ni caracteres especiales!"); }
}

// Funcion para confirmar el alta del Repuesto:

export function confirmarAltaRepuesto() {
    if (modalRepuestoBtnConfirm.innerText === textRestablecerRepuesto) {
        const nuevoRepuesto = validarAltaProducto();
        if (altaRepuesto(nuevoRepuesto) === true) {
            ocutalModal(modalRepuesto);
            mostrarRepuestos();
            habilitarBotonesAgregarProductoACarrito();
            limpiarDatosModalAltaRepuesto();
        }
    }
    else if (modalRepuestoBtnConfirm.innerHTML === textModificarRepuesto) {
        const nuevoRepuesto = validarAltaProducto();
        editarRepuesto(nuevoRepuesto);
        ocutalModal(modalRepuesto);
        mostrarRepuestos();
        habilitarBotonesAgregarProductoACarrito();
        limpiarDatosModalAltaRepuesto();

    } else if (modalRepuestoBtnConfirm.innerText == textEliminarRepuesto) {
        const repuesto = validarAltaProducto();
        eliminarRepuesto(repuesto);
        ocutalModal(modalRepuesto);
        mostrarRepuestos();
        habilitarBotonesAgregarProductoACarrito();
        limpiarDatosModalAltaRepuesto();
    } else { alert("Error: No se pudo realizar correctamente el evento del boton Agregar/Editar Repuesto!"); }
}


// Funcion Limpiar El Modal de Repuesto:

export function limpiarDatosModalAltaRepuesto() {
    modalRepuestoCodigoRepuesto.value = "";
    modalNombreRepuesto.value = "";
    modalModeloRepuesto.value = "";
    modalVehiculoRepuesto.value = "";
    modalPrecioRepuesto.value = "";
    modalCantidadRepuesto.value = "";
    modalImagenRepuesto.value = "";
    modalRepuestoImagen.disabled = false;
    modalRepuestoCheckBox.checked = false;
}

// Funcion para verificar cambios realizados en el Chek Box del Modal de Repuesto:

export function cambiosEnCheckBoxModalRepuesto() {
    if (modalRepuestoCheckBox.checked) {
        modalRepuestoImagen.disabled = true;
    } else {
        modalRepuestoImagen.disabled = false;
    }
}

// Funcion para cambiar el texto del Boton Editar Repuesto:

export function modificarTextoBotonEditarRepuesto() {
    modalRepuestoBtnConfirm.innerText = textModificarRepuesto;
}

// Funcion para cambiar el texto del Boton Eliminar Repuesto:

export function modificarTextoBotonEliminarRepuesto() {
    modalRepuestoBtnConfirm.innerText = textEliminarRepuesto;
}


// Restablezco el texto original del Boton Alta repuesto:

export function restablecerBotonAltaRepuesto() {
    modalRepuestoBtnConfirm.innerText = textRestablecerRepuesto;
}

// Funcion para habilitar los datos de los inputs del modal Repuesto:

export function habilitarInputsModalRepuesto() {
    modalRepuestoCodigoRepuesto.disabled = false;
    modalNombreRepuesto.disabled = false;
    modalModeloRepuesto.disabled = false;
    modalVehiculoRepuesto.disabled = false;
    modalPrecioRepuesto.disabled = false;
    modalCantidadRepuesto.disabled = false;
    modalImagenRepuesto.disabled = false;
    modalRepuestoImagen.disabled = false;
    modalRepuestoCheckBox.disabled = false;
}


// Funcion para dehabilitar los datos de los inputs del modal Repuesto:

export function deshabilitarInputsModalRepuesto() {
    modalRepuestoCodigoRepuesto.disabled = true;
    modalNombreRepuesto.disabled = true;
    modalModeloRepuesto.disabled = true;
    modalVehiculoRepuesto.disabled = true;
    modalPrecioRepuesto.disabled = true;
    modalCantidadRepuesto.disabled = true;
    modalImagenRepuesto.disabled = true;
    modalRepuestoImagen.disabled = true;
    modalRepuestoCheckBox.disabled = true;
}

//Funcion para deshabilitar el input del codigo de Repuesto del modal Repuesto:

export function desHabilitarCodigoRepuestoInput() {
    modalRepuestoCodigoRepuesto.disabled = true;
}




