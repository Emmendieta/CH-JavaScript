import { ocutalModal } from "./funciones-modal.js";
import { validarDatosIngresados } from "../../../funciones/funciones-usuario.js";


export function crearContenidoModalLogin() {
    const contenedorMain = document.getElementById('main');
    //Si existe el modal lo elimino y lo recargo:
    const contenidoModalLogin = document.getElementById('modalLogin');
    if (contenidoModalLogin) { contenidoModalLogin.remove(); }
    //Creo el modal Login:
    const modalLoginContainer = document.createElement('div');
    modalLoginContainer.innerHTML = '';
    modalLoginContainer.classList.add('modal', 'fade');
    modalLoginContainer.id = 'modalLogin';
    modalLoginContainer.setAttribute('tabindex', '-1');
    modalLoginContainer.setAttribute('aria-labelledby', 'modalLoginLabel');
    modalLoginContainer.setAttribute('aria-hidden', 'true');
    modalLoginContainer.innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="modalLoginLabel">Login:</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" id="btnModalLoginX" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form action="" id="formLogin">
                    <div class="form-group">
                        <label for="nombreUsuarioLogin">Nombre Usuario:</label>
                        <input type="text" id="nombreUsuarioLogin" name="nombreUsuarioLogin" required value="Admin">
                    </div>
                    <div class="form-group">
                        <label for="passwordLogin">Password:</label>
                        <input type="password" id="passwordLogin" name="passwordLogin" required value="Admin1234">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="btnModalLoginCancel" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-outline-success" id="btnModalLogin">Login</button>
            </div>
        </div>
    </div> 
    `;
    contenedorMain.appendChild(modalLoginContainer);

    //Boton X del Modal Login:
    const btnModalLoginX = modalLoginContainer.querySelector('#btnModalLoginX');
    btnModalLoginX.addEventListener('click', () => {
        ocutalModal('modalLogin');
    });

    //Boton Close del Modal Login:
    const btnModalLoginCancel = modalLoginContainer.querySelector('#btnModalLoginCancel');
    btnModalLoginCancel.addEventListener('click', () => {
        ocutalModal('modalLogin');
    });

    //Boton Login del Modal Login:
    const btnModalLogin = modalLoginContainer.querySelector('#btnModalLogin');
    btnModalLogin.addEventListener('click', () => {
        validarDatosIngresados();
    });
}

