import { alertSweetAlert2 } from "../../../sweet-alert-2/funciones-sweet-alert-2.js";

// Funcion Mostrar Modal:

export function mostrarModal(nombreModal) {
    try {
        const modal = new bootstrap.Modal(nombreModal);
        if(modal) {modal.show();} else { alertSweetAlert2("Error: Recuperando Modal", `No se pudo recuperar los datos del Modal ${nombreModal}`); }        
    } catch (error) { alertSweetAlert2( "Error Inesperado:", `Ocurrió un error al intentar ocultar el modal: ${error.message}`); }
    finally {} 
}

// Funcion Ocultar Modal:

export function ocutalModal(nombreModal) {
    try {
        const modalElement = document.getElementById(nombreModal);
        if (!modalElement) { 
            alertSweetAlert2("Error: Recuperando Modal", `No se pudo recuperar los datos del Modal ${nombreModal}!`);
            /* return; */ 
        }
        //Muevo el foco a un elemento fuera del modal:
        const btnBuscarRepuesto = document.getElementById('btnBuscarRepuesto');
        if (btnBuscarRepuesto) { btnBuscarRepuesto.focus(); } else { alertSweetAlert2("Advertencia","No se encontró el botón 'btnBuscarRepuesto'.");}
        //Desactivo la interactividad dentro del modal:
        modalElement.setAttribute('inert', 'true');
        // Usar Bootstrap para ocultar el modal:
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
        modalElement.addEventListener(
            'hidden.bs.modal',
            () => { modalElement.removeAttribute('inert');}, { once: true });
    } catch (error) { alertSweetAlert2( "Error Inesperado:", `Ocurrió un error al intentar ocultar el modal: ${error.message}`); }
    finally { }
}
