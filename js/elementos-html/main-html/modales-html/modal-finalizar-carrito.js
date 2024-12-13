import { Repuesto } from "../../../clases/repuesto.js";
import { agregarRepuestoACarrito, calcularMontoTotalCarrito, devuelveListaRepuestosDeCarritoPendiente, eliminarRepuestoDeCarritoPendiente, finalizarCarritoEnBD } from "../../../funciones/funciones-carrito.js";
import { listarRepuestoPorCodigoRepuesto } from "../../../funciones/funciones-repuesto.js";
import { devolverCodigoUsuario } from "../../../funciones/funciones-usuario.js";
import { confirmSweetAlert2, errorSweetAlert2, productoABMSweetAlert2 } from "../../../sweet-alert-2/funciones-sweet-alert-2.js";
import { timerHabilitarBotones } from "../../../variables-constantes/var-const.js";
import { actualizarGloboCantidad, crearContenidoCarritoEnMainBottom, habilitarBotonCarrito, habilitarGloboCantidad, habilitarIconoCarrito } from "../carrito-html.js";
import { crearContenidoRepuestoBottom, habilitarBotonesAgregarProductoACarrito } from "../repuestos-html.js";
import { ocutalModal } from "./funciones-modal.js";

export async function crearContenidoModalFinalizarCarrito() {
    const contenedorMain = document.getElementById('main');
    const contenidoModalFinalizarCarrito = document.getElementById('modalFinalizarCarrito');
    if (contenidoModalFinalizarCarrito) { contenidoModalFinalizarCarrito.remove(); }
    const modalFinalizarCarritoContainer = document.createElement('div');
    modalFinalizarCarritoContainer.innerHTML = '';
    modalFinalizarCarritoContainer.classList.add('modal', 'fade');
    modalFinalizarCarritoContainer.id = 'modalFinalizarCarrito';
    modalFinalizarCarritoContainer.setAttribute('tabindex', '-1');
    modalFinalizarCarritoContainer.setAttribute('aria-labelledby', 'modalFinalizarCarritoLabel');
    modalFinalizarCarritoContainer.setAttribute('aria-hidden', 'true');
    //Obtengo los datos del usuario y la lista de repuestos en el carrito:
    const nombreUsuarioLogueado = document.querySelector('#pUserName').textContent.replace("Usuario: ", "");
    const codigoUsuario = await devolverCodigoUsuario(nombreUsuarioLogueado);
    const listaRepuestos = await devuelveListaRepuestosDeCarritoPendiente(codigoUsuario);
    const listaRepuestosParaListar = listaRepuestos.flat();
    let contenidoModal = ``;
    listaRepuestosParaListar.forEach((repuesto, index) => {
        contenidoModal += `
        <div class="repuesto-item" id="repuesto-${index}">
            <div class="d-flex align-items-center mb-3">
                <img src="${repuesto.imagen}" id="modalFinalizarRepuestoCarritoImagen-${index}" class="card-img-top img-small me-3" alt="Imagen del Repuesto">
                <label id="modalFinalizarRepuestoCarritoLabelNombreRepuesto-${index}" class="me-3 labelFinalCarrito">${repuesto.nombre}</label>
                <div class="d-flex align-items-center me-3">
                    <button type="button" class="btn btn-outline-secondary" id="btnDecrease-${index}">-</button>
                    <input type="number" id="modalFinalizarRepuestoCarritoCantidad-${index}" name="cantidad" class="form-control mx-2" value="${repuesto.cantidad}" min="1" readonly>
                    <button type="button" class="btn btn-outline-secondary" id="btnIncrease-${index}">+</button>
                </div>
                <button type="button" id="btnmodalFinalizarEliminarRepuesto-${index}" class="btn btn-outline-danger me-3">Eliminar</button>
            </div>
            <div class="form-group modalAgregarCarrito mt-2">
                <label id="modalFinalizarprecioTotalRepuesto-${index}">Precio Total del Repuesto ${repuesto.nombre}: $${repuesto.precio * repuesto.cantidad}</label>
            </div>
        </div>
    `;
    });
    const montoTotal = await calcularMontoTotalCarrito(codigoUsuario);
    modalFinalizarCarritoContainer.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalAgregarRepuestoCarritoTitulo">Repuestos en carrito:</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" id="btnModalAgregarRepuestoCarritoX" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="" id="formFinalizarCarrito">
                        ${contenidoModal}
                    </form>
                </div>
                <div class="modal-footer">
                    <p id="textoModalFinalizarRepuestoCarrito">Monto Final: $${montoTotal}</p>
                    <button type="button" class="btn btn-secondary" id="btnModalRepuestoCarritoCerrar" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-outline-success" id="btnModalRepuestoCarritoConfirmarFinal">Confirmar</button>
                </div>
            </div>
        </div>
    `;
    contenedorMain.appendChild(modalFinalizarCarritoContainer);
                //Boton para finalizar el Carrito:
                const btnModalRepuestoCarritoConfirmar = modalFinalizarCarritoContainer.querySelector('#btnModalRepuestoCarritoConfirmarFinal');
                btnModalRepuestoCarritoConfirmar.addEventListener('click', async () => {
                productoABMSweetAlert2("Finalizar Carrito:", "Estas seguro de que desea finalizar el carrito?",
                "Feliciades! Estamos preparando su pedido, pronto tercibiras un mail de confirmación", "Ok, quedara pendiente el carrito hasta que confirmes Finalizar", null,
                () => { finalizarCarritoEnBD(codigoUsuario); })
                .then((resultado) => {
                    if (resultado) {
                        setTimeout(async () => {
                            await crearContenidoRepuestoBottom(1);
                            crearContenidoCarritoEnMainBottom();
                            setTimeout(()=> {
                                habilitarBotonCarrito();
                                habilitarIconoCarrito();
                                habilitarGloboCantidad();
                                habilitarBotonesAgregarProductoACarrito();
                                ocutalModal('modalFinalizarCarrito');
                            }, timerHabilitarBotones);
                        },timerHabilitarBotones);
                    }
                })                            
            });
    listaRepuestosParaListar.forEach((repuesto, index) => {
        //Para cuando baja la cantidad del Repuesto seleccionado:
        document.getElementById(`btnDecrease-${index}`).addEventListener('click', async () => {
            //Cantidad del Repuesto en el input:
            const cantidadInput = document.getElementById(`modalFinalizarRepuestoCarritoCantidad-${index}`);
            // Precio total de la cantidad del repuesto especifico:
            const precioTotalRepuesto = document.getElementById(`modalFinalizarprecioTotalRepuesto-${index}`);
            //Resto la cantidad que se muestra en el input:
            if (cantidadInput.value > 1) { cantidadInput.value = parseInt(cantidadInput.value) - 1;
            } else { errorSweetAlert2("Error: La cantidad no puede ser inferior a 1!"); }
            //Actualizo el precio total especifico del Repuesto:
            precioTotalRepuesto.textContent = `Precio Total del Repuesto ${repuesto.nombre}: $${parseFloat(cantidadInput.value) * parseFloat(repuesto.precio)}`;
            const recuperandoRepuesto = new Repuesto(parseInt(repuesto.codigo), parseInt(repuesto.codigoRepuesto), repuesto.nombre, parseInt(repuesto.modelo), repuesto.vehiculo, parseFloat(repuesto.precio), parseInt(cantidadInput.value), repuesto.imagen);
            //Actualizo la cantidad del repuesto en el carrito y lo almaceno:
            const resultado = await agregarRepuestoACarrito(recuperandoRepuesto, codigoUsuario);
            //Actualizo el precio final del carrito:
            const nuevoMontoTotal = await calcularMontoTotalCarrito(codigoUsuario);
            const montoFinalElement = document.getElementById('textoModalFinalizarRepuestoCarrito');
            montoFinalElement.textContent = `Monto Final: $${nuevoMontoTotal}`;
            //Actualizo la vista donde indica el total del repuestos que estan el carrito:
            await actualizarGloboCantidad(nombreUsuarioLogueado);
            if (resultado) { confirmSweetAlert2("Actualizando Cantidad:", "Se ha actualizado correctamente la cantidad del Repuesto en el Carrito!"); }
        });
        //Para cuando se incrementa la cantidad del repuesto seleccionado:
        document.getElementById(`btnIncrease-${index}`).addEventListener('click', async () => {
            const cantidadInput = document.getElementById(`modalFinalizarRepuestoCarritoCantidad-${index}`);
            const precioTotalRepuesto = document.getElementById(`modalFinalizarprecioTotalRepuesto-${index}`);
            const repuestoBD = await listarRepuestoPorCodigoRepuesto(repuesto.codigoRepuesto);
            if (parseInt(cantidadInput.value) >= repuestoBD.cantidad) { errorSweetAlert2("Error: No se cuenta con la suficiente cantidad de stock del Repuesto!"); }
            else { cantidadInput.value = parseInt(cantidadInput.value) + 1; 
                precioTotalRepuesto.textContent = `Precio Total del Repuesto ${repuesto.nombre}: $${parseFloat(cantidadInput.value) * parseFloat(repuesto.precio)}`;
                const recuperandoRepuesto = new Repuesto(parseInt(repuesto.codigo), parseInt(repuesto.codigoRepuesto), repuesto.nombre, parseInt(repuesto.modelo), repuesto.vehiculo, parseFloat(repuesto.precio), parseInt(cantidadInput.value), repuesto.imagen);
                //Actualizo la cantidad del repuesto en el carrito y lo almaceno:
                const resultado = await agregarRepuestoACarrito(recuperandoRepuesto, codigoUsuario);
                //Actualizo el precio final del carrito:
                const nuevoMontoTotal = await calcularMontoTotalCarrito(codigoUsuario);
                const montoFinalElement = document.getElementById('textoModalFinalizarRepuestoCarrito');
                montoFinalElement.textContent = `Monto Final: $${nuevoMontoTotal}`;
                //Actualizo la vista donde indica el total del repuestos que estan el carrito:
                await actualizarGloboCantidad(nombreUsuarioLogueado);
                if (resultado) { 
                    await actualizarGloboCantidad(nombreUsuarioLogueado);
                    confirmSweetAlert2("Actualizando Cantidad:", "Se ha actualizado correctamente la cantidad del Repuesto en el Carrito!"); 
                }
            }
        });
        //Boton para eliminar el repuesto del carrito:
        document.getElementById(`btnmodalFinalizarEliminarRepuesto-${index}`).addEventListener('click', async () => {
            // Código para eliminar el repuesto
            const repuesta = await eliminarRepuestoDeCarritoPendiente(repuesto, codigoUsuario);
            if (repuesta) {
                await actualizarGloboCantidad(nombreUsuarioLogueado);
                const repuestoItem = document.getElementById(`repuesto-${index}`);
                if (repuestoItem) { repuestoItem.remove(); }
                const repuestosRestantes = document.querySelectorAll('.repuesto-item');
                if (repuestosRestantes.length === 0 ) { ocutalModal('modalFinalizarCarrito'); }
                //Actualizo el precio final del carrito:
                const nuevoMontoTotal = await calcularMontoTotalCarrito(codigoUsuario);
                const montoFinalElement = document.getElementById('textoModalFinalizarRepuestoCarrito');
                montoFinalElement.textContent = `Monto Final: $${nuevoMontoTotal}`;
                confirmSweetAlert2("Eliminar Repuesto de carrito:", "Felicidades se ha eliminado correctamente el Repuesto del carrito!"); }            
        });
    });
}