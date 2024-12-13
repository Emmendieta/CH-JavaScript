import { validarSignUp } from "../../../funciones/funciones-usuario.js";
import { errorSweetAlert2 } from "../../../sweet-alert-2/funciones-sweet-alert-2.js";
import { ocutalModal } from "./funciones-modal.js";


function crearContenidoModalSingUp() {
    const contenderMain = document.getElementById('main');
    //Si existe el modal lo elimino y lo recargo:
    const contenidoModalSingUp = document.getElementById('modalSingUp');
    if (contenidoModalSingUp) { contenidoModalSingUp.remove(); };
    //Creo el modal SingUp:
    const modalSingUpContainer = document.createElement('div');
    modalSingUpContainer.innerHTML = '';
    modalSingUpContainer.classList.add('modal', 'fade');
    modalSingUpContainer.id = 'modalSingUp';
    modalSingUpContainer.setAttribute('tabindex', '-1');
    modalSingUpContainer.setAttribute('aria-labelledby', 'modalSingUp');
    modalSingUpContainer.setAttribute('aria-hidden', 'true');
    modalSingUpContainer.setAttribute('data-bs-backdrop', 'static');
    modalSingUpContainer.setAttribute('data-bs-keyboard', 'false');
    modalSingUpContainer.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalSingUpLabel">Completa el Formulario para Regsitrarse:</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" id="modalSingUpX" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="" id="formSingUp">
                        <div class="form-group">
                            <label for="nombre">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" required>
                        </div>
                        <div class="form-group">
                            <label for="apellido">Apellido:</label>
                            <input type="text" id="apellido" name="apellido" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" autocomplete="email" required>
                        </div>
                        <div class="form-group">
                            <label for="telefono">Teléfono:</label>
                            <input type="number" id="telefono" name="telefono" required>
                        </div>
                        <div class="form-group">
                            <label for="direccion">Dirección:</label>
                            <input type="text" id="direccion" name="direccion" required>
                        </div>
                        <div class="form-group">
                            <label for="ciudad">Ciudad:</label>
                            <input type="text" id="ciudad" name="ciudad" required>
                        </div>
                        <div class="form-group">
                            <label for="provincia">Provincia:</label>
                            <input type="text" id="provincia" name="provincia" required>
                        </div>
                        <div class="form-group">
                            <label for="pais">País:</label>
                            <input type="text" id="pais" name="pais" required>
                        </div>
                        <div class="form-group">
                            <label for="nombreUsuarioModal">Nombre Usuario:</label>
                            <input type="text" id="nombreUsuarioModal" name="nombreUsuario" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" required>
                        </div>
                        <div class="form-group">
                            <label for="confirmarPassword">Reingrese Password:</label>
                            <input type="password" id="confirmarPassword" name="confirmarPassword" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="btnModalSingUpCerrar" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-outline-success" id="btnModalSingUp">Registrarse</button>
                </div>
            </div>
        </div>
    `;
    contenderMain.appendChild(modalSingUpContainer);

    //Boton X del Modal SingUp:
    const btnModalSingUpX = modalSingUpContainer.querySelector('#modalSingUpX');
    btnModalSingUpX.addEventListener('click', () => {
        ocutalModal("modalSingUp");
    });
    //Boton Cerrar del Modal SingUp:
    const btnModalSingUPCerrar = modalSingUpContainer.querySelector('#btnModalSingUpCerrar');
    btnModalSingUPCerrar.addEventListener('click', () => {
        ocutalModal("modalSingUp");
    });
    // Boton Registrarse del Modal SingUp:
    const btnModalSingUp = modalSingUpContainer.querySelector('#btnModalSingUp');
    btnModalSingUp.addEventListener('click', () => {
        validarSignUp();
    }); 
}

export function iniciarSingUp() {
    try {
        crearContenidoModalSingUp();
        const modalSingUpNuevo = document.getElementById('modalSingUp');
        const mostrarModalSingUp = new bootstrap.Modal(modalSingUpNuevo);
        mostrarModalSingUp.show();
    } catch (error) { errorSweetAlert2("Error inesperado. Error: " + error); }
    finally {}
}
