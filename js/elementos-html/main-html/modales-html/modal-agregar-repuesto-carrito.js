import { Repuesto } from "../../../clases/repuesto.js";
import { agregarRepuestoACarrito } from "../../../funciones/funciones-carrito.js";
import { listarRepuestoPorCodigoRepuesto } from "../../../funciones/funciones-repuesto.js";
import { devolverCodigoUsuario } from "../../../funciones/funciones-usuario.js";
import { confirmSweetAlert2, errorSweetAlert2 } from "../../../sweet-alert-2/funciones-sweet-alert-2.js";
import { actualizarGloboCantidad } from "../carrito-html.js";
import { ocutalModal } from "./funciones-modal.js";

export function crearContenidoModalAgregarRepuestoCarrito(agregarRepuesto) {
    try {
        const contenedorMain = document.getElementById('main');
    //Si existe el modal lo elimino y lo recargo:
    const contenidoModalAgregarRepuestoCarrito = document.getElementById('modalAgregarRepuestoACarrito');
    if (contenidoModalAgregarRepuestoCarrito) { contenidoModalAgregarRepuestoCarrito.remove(); }
    //Creo el Modal Agregar Repuesto al Carrito:
    const modalAgregarRepuestoCarritoContainer = document.createElement('div');
    modalAgregarRepuestoCarritoContainer.innerHTML = '';
    modalAgregarRepuestoCarritoContainer.classList.add('modal', 'fade');
    modalAgregarRepuestoCarritoContainer.id = 'modalAgregarRepuestoACarrito';
    modalAgregarRepuestoCarritoContainer.setAttribute('tabindex', '-1');
    modalAgregarRepuestoCarritoContainer.setAttribute('aria-labelledby', 'modalAgregarRepuestoACarritoLabel');
    modalAgregarRepuestoCarritoContainer.setAttribute('aria-hidden', 'true');
    modalAgregarRepuestoCarritoContainer.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalAgregarRepuestoCarritoTitulo">Cantidad requerida:</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" id="btnModalAgregarRepuestoCarritoX" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="" id="formAgregarRepuestoCarrito">
                        <div class="form-group modalAgregarCarrito">
                            <img src= ${agregarRepuesto.imagen} class="card-img-top" id="modalRepuestoCarritoImagen" alt="imgRepuesto">
                        </div>                        
                        <div class="form-group modalAgregarCarrito">
                            <label id="modalRepuestoCarritoLabelCodigoRepuesto">Codigo del Repuesto: ${agregarRepuesto.codigoRepuesto}</label>
                        </div>
                        <div class="form-group modalAgregarCarrito">
                            <label id="modalRepuestoCarritoLabelNombreRepuesto">Nombre del Repuesto: ${agregarRepuesto.nombre}</label>
                        </div>
                        <div class="form-group modalAgregarCarrito">
                            <label id="modalRepuestoCarritoLabelModeloRepuesto">Modelo: ${agregarRepuesto.modelo}</label>
                        </div>
                        <div class="form-group modalAgregarCarrito">
                            <label id="modalRepuestoCarritoLabelVehiculoRepuesto">Vehículo: ${agregarRepuesto.vehiculo}</label>
                        </div>
                        <div class="form-group modalAgregarCarrito">
                            <label id="modalRepuestoCarritoLabelPrecioRepuesto">Precio: ${agregarRepuesto.precio}</label>
                        </div>
                        <div class="form-group modalAgregarCarrito">
                            <label id="modalRepuestoCarritoLabelCantidadRepuesto">Cantidad disponible: ${agregarRepuesto.cantidad}</label>
                        </div>
                        <div class="form-group">
                            <label for="modalRepuestoCarritoCantidad">Ingrese la cantidad requerida:</label>
                            <input type="number" id="modalRepuestoCarritoCantidad" name="modalCantidadRequeridaAgregarRepuestoCarrito" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="btnModalRepuestoCarritoCerrar"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-outline-success" id="btnModalRepuestoCarritoConfirmar">Confirmar</button>
                </div>
            </div>
        </div>
    `;
    contenedorMain.appendChild(modalAgregarRepuestoCarritoContainer);
/*     //Boton X:
    const btnModalAgregarRepuestoCarritoX = document.getElementById('btnModalAgregarRepuestoCarritoX');
    btnModalAgregarRepuestoCarritoX.addEventListener('click', () => ocutalModal('modalAgregarRepuestoACarrito'));
    //Boton Cerrar:
    const btnModalAgregarRepuestaCarritoCerrar = document.getElementById('btnModalRepuestoCarritoCerrar');
    btnModalAgregarRepuestaCarritoCerrar.addEventListener('click', () => ocutalModal('modalAgregarRepuestoACarrito')); */
    //Boton Agregar Repuesto a Carrito:
    const btnModalRepuestoCarritoConfirmar = modalAgregarRepuestoCarritoContainer.querySelector('#btnModalRepuestoCarritoConfirmar');
    btnModalRepuestoCarritoConfirmar.addEventListener('click', async () => {
        const cantidad = modalAgregarRepuestoCarritoContainer.querySelector("#modalRepuestoCarritoCantidad");
        const repuesto = new Repuesto(0, parseInt(agregarRepuesto.codigoRepuesto), agregarRepuesto.nombre, parseInt(agregarRepuesto.modelo), 
        agregarRepuesto.vehiculo, parseFloat(agregarRepuesto.precio), parseInt(cantidad.value), agregarRepuesto.imagen);
        const repuestoEnBD = await listarRepuestoPorCodigoRepuesto(repuesto.codigoRepuesto);
        if (repuestoEnBD !== null) {
            if (repuestoEnBD.cantidad >= repuesto.cantidad) {
                repuesto.codigo = repuestoEnBD.codigo;
                const nombreUsuarioLogueado = document.querySelector('#pUserName').textContent.replace("Usuario: ", "");
                const codigoUsuario = await devolverCodigoUsuario(nombreUsuarioLogueado);
                if (codigoUsuario > 0) {
                    const resultado = await agregarRepuestoACarrito(repuesto, codigoUsuario);
                    if (resultado) { 
                        await actualizarGloboCantidad(nombreUsuarioLogueado);
                        ocutalModal('modalAgregarRepuestoACarrito');
                        confirmSweetAlert2("Agregando Repuesto a Carrito:", "Felicidades! se ha agregado correctamente el Repuesto a su carrito!"); 
                    }
                    else { errorSweetAlert2("Error: Se quiso agregar al carrito el mismo repuesto con la misma cantidad que ya esta añadido!"); }
                } else { errorSweetAlert2("Error: no se pudo recuperar la información del usuario:" + nombreUsuarioLogueado); }
            }
            else { errorSweetAlert2("Error: No hay suficiente Stock del Producto que quiere agregar al carrito!"); }
        }
    }); 
    } catch(error) { errorSweetAlert2("Error Inesperado al crear el modal para agregar el repuesto al Carrito. Error: " + error); }
    finally {}
}

