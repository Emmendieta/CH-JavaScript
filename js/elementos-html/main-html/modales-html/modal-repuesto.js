import { procesoABMRepuesto, validarAltaProducto } from "../../../funciones/funciones-repuesto.js";
import { errorSweetAlert2, productoABMSweetAlert2 } from "../../../sweet-alert-2/funciones-sweet-alert-2.js";
import { adminText,  timerHabilitarBotones} from "../../../variables-constantes/var-const.js";
import { habilitarBotonesAgregarEditarEliminarProducto, habilitarBotonesAgregarProductoACarrito } from "../repuestos-html.js";
import { ocutalModal } from "./funciones-modal.js";


export function crearContenidoModalRepuesto(agregarRepuesto, opcion) {
    try {
        const contenedorMain = document.getElementById('main');
        //Si existe el momdal lo elimino y lo recargo:
        const contenidoModalRepuesto = document.getElementById('modalRepuesto');
        if (contenidoModalRepuesto) { contenidoModalRepuesto.remove(); }
        //Creo el Modal Repuesto:
        const modalRepuestoContainer = document.createElement('div');
        modalRepuestoContainer.innerHTML = '';
        modalRepuestoContainer.classList.add('modal', 'fade');
        modalRepuestoContainer.id = 'modalRepuesto';
        modalRepuestoContainer.setAttribute('tabindex', '-1');
        modalRepuestoContainer.setAttribute('aria-labelledby', 'modalRepuestoLabel');
        modalRepuestoContainer.setAttribute('aria-hidden', 'true');
        switch (opcion) {
                /* ------------------//Opcion 1 es para dar el Alta a un Repuesto: ------------------ */
            case 1:
                modalRepuestoContainer.innerHTML = `
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="modalRepuestoTitulo">Completa el Formulario para dar de alta al Repuesto:</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" id="btnModalAltaRepuestoX" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="formAltaRepuesto">
                                    <div class="form-group">
                                        <label for="modalCodigoRepuesto">Codigo del Repuesto:</label>
                                        <input type="number" id="modalCodigoRepuesto" name="codigoRepuesto" required value="10000008">
                                    </div>
                                    <div class="form-group">
                                        <label for="modalNombreRepuesto">Nombre:</label>
                                        <input type="text" id="modalNombreRepuesto" name="nombre" required value="algo">
                                    </div>
                                    <div class="form-group">
                                        <label for="modalModeloRepuesto">Modelo:</label>
                                        <input type="number" id="modalModeloRepuesto" name="modelo" required value="2015">
                                    </div>
                                    <div class="form-group">
                                        <label for="modalVehiculoRepuesto">Vehículo:</label>
                                        <input type="text" id="modalVehiculoRepuesto" name="vehiculo" required value="algo">
                                    </div>
                                    <div class="form-group">
                                        <label for="modalPrecioRepuesto">Precio:</label>
                                        <input type="number" id="modalPrecioRepuesto" name="precio" required value="15.99">
                                    </div>
                                    <div class="form-group">
                                        <label for="modalCantidadRepuesto">Cantidad:</label>
                                        <input type="number" id="modalCantidadRepuesto" name="cantidad" required value="100">
                                    </div>
                                    <div class="form-group">
                                        <label for="modalImagenRepuesto">URL de la imágen del Repuesto:</label>
                                        <input type="url" id="modalImagenRepuesto" name="imagenRepuesto" required>
                                    </div>
                                    <div class="form-group modalRepuestoCheck">
                                        <label class="form-check-label" for="checkBoxRepuestoImagen">No tengo imágen del Repuesto
                                            por ahora</label>
                                        <input type="checkbox" class="form-check-input" id="checkBoxRepuestoImagen">
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" id="btnModalAltaRepuestoCerrar"
                                    data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-outline-success" id="btnModalConfirmRepuesto">Alta
                                    Repuesto</button>
                            </div>
                        </div>
                    </div>
                `;
                contenedorMain.appendChild(modalRepuestoContainer);
                const btnModalRepuestoAlta = modalRepuestoContainer.querySelector("#btnModalConfirmRepuesto");
                const checkBoxRepuestoImagen = modalRepuestoContainer.querySelector('#checkBoxRepuestoImagen');
                const modalImagenRepuesto = document.getElementById('modalImagenRepuesto');
                checkBoxRepuestoImagen.addEventListener('change', () => {
                    if (checkBoxRepuestoImagen.checked) { 
                        modalImagenRepuesto.disabled = true;
                        modalImagenRepuesto.value = "https://github.com/Emmendieta/CH-JavaScript/blob/main/images/Imagen-no-disponible.png?raw=true";
                    } else { 
                        modalImagenRepuesto.disabled = false; 
                        modalImagenRepuesto.value = "";
                    }
                });
                //Método para el Alta de un nuevo Repuesto:
                btnModalRepuestoAlta.addEventListener('click', async () => {
                    const repuestoValidado = validarAltaProducto();
                    if (repuestoValidado != null) {
                        try {
                            const resultado = await productoABMSweetAlert2( "Alta Repuesto:", `¿Estás seguro que quieres dar el alta al Repuesto: ${repuestoValidado.nombre}?`, 
                                `Feliciades! Se ha dado el alta correctamente al repuesto: ${repuestoValidado.nombre}`, 
                                `Ok! No se procedió a dar el alta al repuesto: ${repuestoValidado.nombre}`, repuestoValidado.imagen, () => procesoABMRepuesto(repuestoValidado, 1));
                            if (resultado) {
                                setTimeout(() => {
                                    ocutalModal('modalRepuesto');
                                    habilitarBotonesAgregarProductoACarrito();
                                    const nombreUsuarioLogueado = document.getElementById('pUserName');
                                    if (nombreUsuarioLogueado.innerText === adminText) {
                                        habilitarBotonesAgregarEditarEliminarProducto();
                                    }
                                }, timerHabilitarBotones);
                            }
                        } catch(error) { errorSweetAlert2("Error inesperado al dar el alta al Repuesto indicado. Error: " + error); }
                    }
                });
                break;
                /* ------------------//Opcion 2 es para Editar un Repuesto: ------------------ */
                case 2:
                    modalRepuestoContainer.innerHTML = `
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="modalRepuestoTitulo">Editar el
                                        Repuesto:</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" id="btnModalAltaRepuestoX"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form action="" id="formAltaRepuesto">
                                        <div class="form-group">
                                            <label for="modalCodigoRepuesto">Codigo del Repuesto:</label>
                                            <input type="number" id="modalCodigoRepuesto" name="codigoRepuesto" required value="${agregarRepuesto.codigoRepuesto}">
                                        </div>
                                        <div class="form-group">
                                            <label for="modalNombreRepuesto">Nombre:</label>
                                            <input type="text" id="modalNombreRepuesto" name="nombre" required value="${agregarRepuesto.nombre}">
                                        </div>
                                        <div class="form-group">
                                            <label for="modalModeloRepuesto">Modelo:</label>
                                            <input type="number" id="modalModeloRepuesto" name="modelo" required value="${agregarRepuesto.modelo}">
                                        </div>
                                        <div class="form-group">
                                            <label for="modalVehiculoRepuesto">Vehículo:</label>
                                            <input type="text" id="modalVehiculoRepuesto" name="vehiculo" required value="${agregarRepuesto.vehiculo}">
                                        </div>
                                        <div class="form-group">
                                            <label for="modalPrecioRepuesto">Precio:</label>
                                            <input type="number" id="modalPrecioRepuesto" name="precio" required value="${agregarRepuesto.precio}">
                                        </div>
                                        <div class="form-group">
                                            <label for="modalCantidadRepuesto">Cantidad:</label>
                                            <input type="number" id="modalCantidadRepuesto" name="cantidad" required value="${agregarRepuesto.cantidad}">
                                        </div>
                                        <div class="form-group">
                                            <label for="modalImagenRepuesto">URL de la imágen del Repuesto:</label>
                                            <input type="url" id="modalImagenRepuesto" name="imagenRepuesto" required value="${agregarRepuesto.imagen}">
                                        </div>
                                        <div class="form-group modalRepuestoCheck">
                                            <label class="form-check-label" for="checkBoxRepuestoImagen">No tengo imágen del Repuesto
                                                por ahora</label>
                                            <input type="checkbox" class="form-check-input" id="checkBoxRepuestoImagen">
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" id="btnModalAltaRepuestoCerrar"
                                        data-bs-dismiss="modal">Cerrar</button>
                                    <button type="button" class="btn btn-outline-success" id="btnModalModifyRepuesto">Modificar
                                        Repuesto</button>
                                </div>
                            </div>
                        </div>
                    `;
                    contenedorMain.appendChild(modalRepuestoContainer);
                    const btnModalRepuestoModificar = modalRepuestoContainer.querySelector('#btnModalModifyRepuesto');
                    const checkBoxRepuestoImagenEdit = modalRepuestoContainer.querySelector('#checkBoxRepuestoImagen');
                    const modalImagenRepuestoEdit = document.getElementById('modalImagenRepuesto');
                    checkBoxRepuestoImagenEdit.addEventListener('change', () => {
                        if (checkBoxRepuestoImagenEdit.checked) {
                            modalImagenRepuestoEdit.disabled = true;
                            modalImagenRepuestoEdit.value = "https://github.com/Emmendieta/CH-JavaScript/blob/main/images/Imagen-no-disponible.png?raw=true";
                        } else { 
                            modalImagenRepuestoEdit.disabled = false; 
                            modalImagenRepuestoEdit.value = "";
                        }
                    }); 
                    //Método para Editar un Repuesto:
                    btnModalRepuestoModificar.addEventListener('click', () => {
                        const repuestoValidado = validarAltaProducto();
                        if (repuestoValidado != null) {
                            productoABMSweetAlert2( "Modificar Repuesto:", `¿Estás seguro que quieres modificar el Repuesto: ${repuestoValidado.nombre}?`, 
                                `Feliciades! Se ha modificado correctamente al repuesto: ${repuestoValidado.nombre}`, 
                                `Ok! No se procedió a modificar al repuesto: ${repuestoValidado.nombre}`, repuestoValidado.imagen, () => procesoABMRepuesto(repuestoValidado, 2))
                            .then((resultado) => {
                                if (resultado) {
                                    setTimeout(() => {
                                        ocutalModal('modalRepuesto');
                                        habilitarBotonesAgregarProductoACarrito();
                                        const nombreUsuarioLogueado = document.getElementById('pUserName');
                                        if (nombreUsuarioLogueado.innerText === adminText) { habilitarBotonesAgregarEditarEliminarProducto();}}, timerHabilitarBotones); }
                            });
                        }
                    });
                    break;
            /* ------------------ Opcion 3 es para Eliminar un Repuesto: ------------------ */
            case 3:
                modalRepuestoContainer.innerHTML = `
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="modalRepuestoTitulo">Eliminar el
                                    Repuesto:</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" id="btnModalAltaRepuestoX"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form action="" id="formAltaRepuesto">
                                    <div class="form-group">
                                        <label for="modalCodigoRepuesto">Codigo del Repuesto:</label>
                                        <input type="number" id="modalCodigoRepuesto" name="codigoRepuesto" required value="${agregarRepuesto.codigoRepuesto}">
                                    </div>
                                    <div class="form-group">
                                        <label for="modalNombreRepuesto">Nombre:</label>
                                        <input type="text" id="modalNombreRepuesto" name="nombre" required value="${agregarRepuesto.nombre}">
                                    </div>
                                    <div class="form-group">
                                        <label for="modalModeloRepuesto">Modelo:</label>
                                        <input type="number" id="modalModeloRepuesto" name="modelo" required value="${agregarRepuesto.modelo}">
                                    </div>
                                    <div class="form-group">
                                        <label for="modalVehiculoRepuesto">Vehículo:</label>
                                        <input type="text" id="modalVehiculoRepuesto" name="vehiculo" required value="${agregarRepuesto.vehiculo}">
                                    </div>
                                    <div class="form-group">
                                        <label for="modalPrecioRepuesto">Precio:</label>
                                        <input type="number" id="modalPrecioRepuesto" name="precio" required value="${agregarRepuesto.precio}">
                                    </div>
                                    <div class="form-group">
                                        <label for="modalCantidadRepuesto">Cantidad:</label>
                                        <input type="number" id="modalCantidadRepuesto" name="cantidad" required value="${agregarRepuesto.cantidad}">
                                    </div>
                                    <div class="form-group">
                                        <label for="modalImagenRepuesto">URL de la imágen del Repuesto:</label>
                                        <input type="url" id="modalImagenRepuesto" name="imagenRepuesto" required value="${agregarRepuesto.imagen}">
                                    </div>
                                    <div class="form-group modalRepuestoCheck">
                                        <label class="form-check-label" for="checkBoxRepuestoImagen">No tengo imágen del Repuesto
                                            por ahora</label>
                                        <input type="checkbox" class="form-check-input" id="checkBoxRepuestoImagen">
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" id="btnModalAltaRepuestoCerrar"
                                    data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-outline-success" id="btnModalDeleteRepuesto">Eliminar
                                    Repuesto</button>
                            </div>
                        </div>
                    </div>
                `;
                contenedorMain.appendChild(modalRepuestoContainer);
                const btnModalRepuestoEliminar = modalRepuestoContainer.querySelector('#btnModalDeleteRepuesto');
                const checkBoxRepuestoImagenDelete = modalRepuestoContainer.querySelector('#checkBoxRepuestoImagen');             
                checkBoxRepuestoImagenDelete.disabled = true;
                //Método para Eliminar un Repuesto:
                btnModalRepuestoEliminar.addEventListener('click', () => {
                    const repuestoValidado = validarAltaProducto();
                    if (repuestoValidado != null) {
                        productoABMSweetAlert2( "Eliminar Repuesto:", `¿Estás seguro que quieres eliminar al Repuesto: ${repuestoValidado.nombre}?`, 
                            `Feliciades! Se ha eliminado correctamente al repuesto: ${repuestoValidado.nombre}`, 
                            `Ok! No se procedió a eliminar al repuesto: ${repuestoValidado.nombre}`, repuestoValidado.imagen, () => procesoABMRepuesto(repuestoValidado, 3))
                        .then((resultado) => {
                            if (resultado) {
                            setTimeout(() => {
                                ocutalModal('modalRepuesto');
                                habilitarBotonesAgregarProductoACarrito();
                                const nombreUsuarioLogueado = document.getElementById('pUserName');
                                if (nombreUsuarioLogueado.innerText === adminText) { habilitarBotonesAgregarEditarEliminarProducto(); }}, timerHabilitarBotones); } 
                        });
                    }
                });
            break;
            default: errorSweetAlert2("Error Inesperado, no se pudo seleccionar correctamente la opción indicada para mostrar el Modal de Repuesto deseado!");
        }
    } catch (error) { errorSweetAlert2("Error Inesperado al crear el Modal de Repuesto. Error: " + error); }
    finally { }
}

// Funcion para dehabilitar los datos de los inputs del modal Repuesto:

export function deshabilitarInputsModalRepuesto() {
    const modalRepuestoCodigoRepuesto = document.getElementById('modalCodigoRepuesto');
    const modalRepuestoNombre = document.getElementById('modalNombreRepuesto');
    const modalRepuestoModelo = document.getElementById('modalModeloRepuesto');
    const modalRepuestoVehiculo = document.getElementById('modalVehiculoRepuesto');
    const modalRepuestoPrecio = document.getElementById('modalPrecioRepuesto');
    const modalRepuestoCantidad = document.getElementById('modalCantidadRepuesto');
    const modalRepuestoImagen = document.getElementById('modalImagenRepuesto');
    const modalRepuestoCheckBox = document.getElementById('checkBoxRepuestoImagen');
    modalRepuestoCodigoRepuesto.disabled = true;
    modalRepuestoNombre.disabled = true;
    modalRepuestoModelo.disabled = true;
    modalRepuestoVehiculo.disabled = true;
    modalRepuestoPrecio.disabled = true;
    modalRepuestoCantidad.disabled = true;
    modalRepuestoImagen.disabled = true;
    modalRepuestoCheckBox.disabled = true;
}

//Funcion para deshabilitar el input del codigo de Repuesto del modal Repuesto:

export function desHabilitarCodigoRepuestoInput() {
    const modalRepuestoCodigoRepuesto = document.getElementById('modalCodigoRepuesto');
    modalRepuestoCodigoRepuesto.disabled = true;
}