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
                    <div class="mt-4" id="divCheckBoxFormaPago">
                        <h5>Forma de Pago</h5>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="checkboxTarjeta" />
                            <label class="form-check-label" for="checkboxTarjeta">
                                Tarjeta de Crédito
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="checkboxEfectivo" />
                            <label class="form-check-label" for="checkboxEfectivo">
                                Pago en Efectivo
                            </label>
                        </div>
                    </div>
                    <div id="tarjetaInfo" class="mt-4" style="display: none;">
                        <h5>Datos de la Tarjeta de Crédito</h5>
                        <h6 id="h6infoTarjeta">Importante: No se almacenará la información de su tarjeta de credito</h6>
                        <div class="mb-3">
                            <label for="nombreTarjeta" class="form-label">Nombre del Titular</label>
                            <input type="text" class="form-control" id="nombreTarjeta" placeholder="Nombre completo" required>
                        </div>
                        <div class="mb-3">
                            <label for="numeroTarjeta1" class="form-label">Primeros 4 números de la Tarjeta</label>
                            <input type="text" class="form-control" id="numeroTarjeta1" placeholder="XXXX" required>
                        </div>
                        <div class="mb-3">
                            <label for="numeroTarjeta2" class="form-label">Segundos 4 números de la Tarjeta</label>
                            <input type="text" class="form-control" id="numeroTarjeta2" placeholder="XXXX" required>
                        </div>
                            <div class="mb-3">
                            <label for="numeroTarjeta3" class="form-label">Terceros 4 números de la Tarjeta</label>
                            <input type="text" class="form-control" id="numeroTarjeta3" placeholder="XXXX" required>
                        </div>
                            <div class="mb-3">
                            <label for="numeroTarjeta4" class="form-label">Cuartos 4 números de la Tarjeta</label>
                            <input type="text" class="form-control" id="numeroTarjeta4" placeholder="XXXX" required>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="mesExpiracion" class="form-label">Mes de Expiración</label>
                                <input type="number" class="form-control" id="mesExpiracion" required> 
                            </div>
                            <div class="col-md-6 mb-3">
                            <label for="anioExpiracion" class="form-label">Año de Expiración</label>
                            <input type="number" class="form-control" id="anioExpiracion" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="codigoSeguridad" class="form-label">Código de Seguridad (CVV)</label>
                                <input type="text" class="form-control" id="codigoSeguridad" placeholder="CVV">
                            </div>
                        </div>
                    </div>
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
    //Métodos para la tarjeta:
    const checkboxTarjeta = document.getElementById('checkboxTarjeta');
    checkboxTarjeta.addEventListener('change', function () {
        const tarjetaInfo = document.getElementById('tarjetaInfo');
        if (this.checked) {
            tarjetaInfo.style.display = 'block';
            document.getElementById('checkboxEfectivo').checked = false;
        } else { tarjetaInfo.style.display = 'none'; }
    });
    //Metodos para efectivo:
    const checkboxEfectivo = document.getElementById('checkboxEfectivo');
    checkboxEfectivo.addEventListener('change', function () {
        const tarjetaInfo = document.getElementById('tarjetaInfo');
        if (this.checked) {
            tarjetaInfo.style.display = 'none';
            document.getElementById('checkboxTarjeta').checked = false;
        }
    });
    //Boton para finalizar el Carrito:
    const btnModalRepuestoCarritoConfirmar = modalFinalizarCarritoContainer.querySelector('#btnModalRepuestoCarritoConfirmarFinal');
    btnModalRepuestoCarritoConfirmar.addEventListener('click', () => {
        if (checkboxTarjeta.checked) {
            const validarTarjeta = validarDatosTarjetaDeCredito();
            if (validarTarjeta === true) {
                productoABMSweetAlert2("Finalizar Carrito:", "Estas seguro de que desea finalizar el carrito?",
                    "Feliciades! Estamos preparando su pedido, pronto tercibiras un mail de confirmación", "Ok, quedara pendiente el carrito hasta que confirmes Finalizar", null,
                    () => { finalizarCarritoEnBD(codigoUsuario); })
                    .then((resultado) => {
                        if (resultado) {
                            setTimeout(async () => {
                                await crearContenidoRepuestoBottom(1);
                                crearContenidoCarritoEnMainBottom();
                                setTimeout(() => {
                                    habilitarBotonCarrito();
                                    habilitarIconoCarrito();
                                    habilitarGloboCantidad();
                                    habilitarBotonesAgregarProductoACarrito();
                                    ocutalModal('modalFinalizarCarrito');
                                }, timerHabilitarBotones);
                            }, timerHabilitarBotones);
                        }
                    })
            }
        } else if (checkboxEfectivo.checked) {
            productoABMSweetAlert2("Finalizar Carrito:", "Estas seguro de que desea finalizar el carrito?",
                "Feliciades! Estamos preparando su pedido, pronto tercibiras un mail de confirmación", "Ok, quedara pendiente el carrito hasta que confirmes Finalizar", null,
                () => { finalizarCarritoEnBD(codigoUsuario); })
                .then((resultado) => {
                    if (resultado) {
                        setTimeout(async () => {
                            await crearContenidoRepuestoBottom(1);
                            crearContenidoCarritoEnMainBottom();
                            setTimeout(() => {
                                habilitarBotonCarrito();
                                habilitarIconoCarrito();
                                habilitarGloboCantidad();
                                habilitarBotonesAgregarProductoACarrito();
                                ocutalModal('modalFinalizarCarrito');
                            }, timerHabilitarBotones);
                        }, timerHabilitarBotones);
                    }
                })
        } else { errorSweetAlert2("Error: Tiene que eligir algun medio de pago!"); }
    });
    listaRepuestosParaListar.forEach((repuesto, index) => {
        //Para cuando baja la cantidad del Repuesto seleccionado:
        document.getElementById(`btnDecrease-${index}`).addEventListener('click', async () => {
            //Cantidad del Repuesto en el input:
            const cantidadInput = document.getElementById(`modalFinalizarRepuestoCarritoCantidad-${index}`);
            // Precio total de la cantidad del repuesto especifico:
            const precioTotalRepuesto = document.getElementById(`modalFinalizarprecioTotalRepuesto-${index}`);
            //Resto la cantidad que se muestra en el input:
            if (cantidadInput.value > 1) {
                cantidadInput.value = parseInt(cantidadInput.value) - 1;
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
            else {
                cantidadInput.value = parseInt(cantidadInput.value) + 1;
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
                if (repuestosRestantes.length === 0) { ocutalModal('modalFinalizarCarrito'); }
                //Actualizo el precio final del carrito:
                const nuevoMontoTotal = await calcularMontoTotalCarrito(codigoUsuario);
                const montoFinalElement = document.getElementById('textoModalFinalizarRepuestoCarrito');
                montoFinalElement.textContent = `Monto Final: $${nuevoMontoTotal}`;
                confirmSweetAlert2("Eliminar Repuesto de carrito:", "Felicidades se ha eliminado correctamente el Repuesto del carrito!");
            }
        });
    });
}

function validarDatosTarjetaDeCredito() {
    try {
        const nombreTarjeta = document.getElementById('nombreTarjeta').value;
        const numeroTarjeta1 = document.getElementById('numeroTarjeta1').value;
        const numeroTarjeta2 = document.getElementById('numeroTarjeta2').value;
        const numeroTarjeta3 = document.getElementById('numeroTarjeta3').value;
        const numeroTarjeta4 = document.getElementById('numeroTarjeta4').value;
        const mesExpiracion = document.getElementById('mesExpiracion').value;
        const anioExpiracion = (document.getElementById('anioExpiracion').value);
        const codigoSeguridad = document.getElementById('codigoSeguridad').value;
        const fechaActual = new Date();
        const mesActual = String(fechaActual.getMonth() + 1);
        const anioActual = String(fechaActual.getFullYear());
        const regexNombre = /^[a-zA-Z ]+$/;
        if (nombreTarjeta.length > 0 && regexNombre.test(nombreTarjeta)) {
            const regexNumeroTarjeta = /^\d{4}$/;
            if (numeroTarjeta1.length > 0 && numeroTarjeta2.length > 0 && numeroTarjeta3.length > 0 && numeroTarjeta4.length > 0) {
                if (regexNumeroTarjeta.test(numeroTarjeta1) && regexNumeroTarjeta.test(numeroTarjeta2) && regexNumeroTarjeta.test(numeroTarjeta3) && regexNumeroTarjeta.test(numeroTarjeta4)) {
                    const regexMes = /^\d{2}$/;
                    if (mesExpiracion.length > 0 && regexMes.test(mesExpiracion)) {
                        if (anioExpiracion.length > 0 && regexNumeroTarjeta.test(anioExpiracion)) {
                            const regexCodigoTarjeta = /^\d{3}$/;
                            if (parseInt(anioExpiracion) < parseInt(anioActual)) { errorSweetAlert2("Error: La tarjeta esta vencida!"); }
                            else if (anioExpiracion === anioActual) {
                                if (parseInt(mesExpiracion) < parseInt(mesActual)) { errorSweetAlert2("Error: La tarjeta esta vencida!"); }
                                else {
                                    if (codigoSeguridad.length > 0 && regexCodigoTarjeta.test(codigoSeguridad)) {  
                                        return true;
                                    } else { errorSweetAlert2("Error: El código de seguridad no puede ser nulo y solo acepta 3 números!"); }
                                }
                            }
                            else {
                                if (codigoSeguridad.length > 0 && regexCodigoTarjeta.test(codigoSeguridad)) {
                                    return true;
                                } else { errorSweetAlert2("Error: El código de seguridad no puede ser nulo y solo acepta 3 números!"); }
                            }
                        } else { errorSweetAlert2("Error: El año de expiración de la tarjeta no puede ser nulo!"); }
                    } else { errorSweetAlert2("Error: El mes de expiración de la tarjeta no puede ser nulo!"); }
                } else { errorSweetAlert2("Error: Los valores a ingresar en cada apartado de la tarjeta solo acepta números y tiene que ingresar un total de 4 en cada apartado!"); }
            } else { errorSweetAlert2("Error: El número de la tarjeta no puede ser nulo!"); }
        } else { errorSweetAlert2("Error: El nombre del titular de la tarjeta no puede ser nulo y solo acepta letras y espacios!"); }
    } catch (error) { errorSweetAlert2("Error al tratar de validar los datos de la tarjeta de crédito! Error: " + error); }
}