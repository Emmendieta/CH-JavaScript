import { devolverCantidadRepuestosEnCarrito } from "../../funciones/funciones-carrito.js";
import { devolverCodigoUsuario } from "../../funciones/funciones-usuario.js";
import { errorSweetAlert2 } from "../../sweet-alert-2/funciones-sweet-alert-2.js";
import { demoraCargarCantidadRepuestosEnCarrito } from "../../variables-constantes/var-const.js";
import { mostrarModal } from "./modales-html/funciones-modal.js";
import { crearContenidoModalFinalizarCarrito } from "./modales-html/modal-finalizar-carrito.js";


export function crearContenidoCarritoEnMainBottom() {
    const contenedorMain = document.getElementById('main');
    //Verifico si lo tengo que eliminar y recargar:
    const contenidoCarrito = document.querySelector('.mnSectCarrito');
    if (contenidoCarrito) { contenidoCarrito.remove(); }
    //creo la seccion:
    const carritoContainer = document.createElement('section');
    carritoContainer.innerHTML = '';
    carritoContainer.classList.add('mnSectCarrito');
    //Contenido del Carrito:
    carritoContainer.innerHTML = `
    <article class="mnSectCarritoProductos">

    </article>
    <article class="mnSectCarritoFinalizar">
        <button type="button" class="btn btn-danger" id="btnCarrito">Finalizar Carrito</button>
        <i class="fa-solid fa-cart-shopping fa-xl" id="iconoCarrito"></i>
        <span id="globoCantidad">0</span>
    </article>
    `;
    //Agrego el contenido al main:
    contenedorMain.appendChild(carritoContainer);
    const btnCarrito = carritoContainer.querySelector("#btnCarrito");
    btnCarrito.addEventListener('click', async () => {
        const nombreUsuarioLogueado = document.querySelector('#pUserName').textContent.replace("Usuario: ", "");
        const codigoUsuario = await devolverCodigoUsuario(nombreUsuarioLogueado);
        const cantidad = await devolverCantidadRepuestosEnCarrito(codigoUsuario);
        if (cantidad === 0) { errorSweetAlert2("Error: No se puede finalizar un carrito que no tiene agregado ningun repuesto!"); }
        else if ( cantidad > 0) {
            await crearContenidoModalFinalizarCarrito();
            const modalFinalizarCarrito = document.querySelector('#modalFinalizarCarrito'); 
            mostrarModal(modalFinalizarCarrito);
        }
        else { errorSweetAlert2("Error al tratar de determinar la cantidad de repuestos en el carrito!"); }
    });
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

/* ----- FUNCIONES PARA MOSTRAR LA CANTIDAD DE REPUESTOS EN EL CARRITO ---- */

export async function actualizarGloboCantidad(usuarioLogueado) {
    const globoCantidad = document.getElementById('globoCantidad');
    const invitado = "Invitado";
    //En caso de que se loguee un usuario:
    if (usuarioLogueado !== invitado) {
        const codigoUsuario = await devolverCodigoUsuario(usuarioLogueado);
        const cantidad = await devolverCantidadRepuestosEnCarrito(codigoUsuario);
        if (cantidad >= 0) {
            setTimeout(() => {
                if (cantidad >= 0) {
                    globoCantidad.textContent = cantidad;
                    globoCantidad.style.opacity = 1;
                }
            }, demoraCargarCantidadRepuestosEnCarrito);
        }
    }
}

export function deshabilitarGloboCantidad() {
    const globoCantidad = document.getElementById("globoCantidad");
    globoCantidad.textContent = "0";
    globoCantidad.style.opacity = 0.5;
}

export function habilitarGloboCantidad() {
    const globoCantidad = document.getElementById("globoCantidad");
    globoCantidad.textContent = "0";
    globoCantidad.style.opacity = 1;
}
