const tituloErrorDatos = "Error: Verificar los datos ingresados!";
const iconError = "error";
const iconConfirm = "success";
const iconWarning = "warning";

export function errorSweetAlert2(texto) {
    Swal.fire({
        title: tituloErrorDatos,
        text: texto,
        icon: iconError
    });
}

export function confirmSweetAlert2(titulo, texto) {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: iconConfirm
    });
}

export function alertSweetAlert2(titulo, texto) {
    Swal.fire( {
        title: titulo,
        text: texto,
        icon: iconWarning
    });
}

export function pendingSweetAlert2(nombreBD, tiempo) {
    Swal.fire({
        title: "Cargando datos:",
        text: `Por favor, espere mientras se cargan los datos de ${nombreBD}`,
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: tiempo,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

export function agregarProductoSweetAlert2(nombreRepuesto, cantidad, imagen, funcionAEjecutar) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Agregar Repuesto al carrito:",
        text: `¿Estas seguro que quieres agregar ${cantidad} del producto ${nombreRepuesto} al carrito?`,
        imageUrl: `${imagen}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, agregar",
        cancelButtonText: "No, cancelar",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            funcionAEjecutar;
            swalWithBootstrapButtons.fire({
            title: "Confirmado!",
            text: `Feliciades, has agregado la cantidad: ${cantidad} del repuesto ${nombreRepuesto} al carrito!`,
            icon: "success"
        });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: `Ok, no se va a agregar la cantidad ${cantidad} del repuesto ${nombreRepuesto} al carrito!`,
            icon: "error"
        });
        }
    });
}

export function productoABMSweetAlert2(titulo, texto, textoConfirmado, textoRechazado, imagen, funcionAEjecutar) {
    return new Promise(async (resolve, reject) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        try {
            const result = await swalWithBootstrapButtons.fire({
                title: titulo,
                text: texto,
                imageUrl: imagen,
                showCancelButton: true,
                confirmButtonText: "Si, proceder",
                cancelButtonText: "No, cancelar",
                reverseButtons: true
            });

            if (result.isConfirmed) {
                if (typeof funcionAEjecutar === "function") {
                    const resultado = await funcionAEjecutar();
                    if (resultado === true || resultado === undefined) {
                        await swalWithBootstrapButtons.fire({
                            title: "Confirmado!",
                            text: textoConfirmado,
                            icon: "success"
                        });
                        resolve(true);
                    } else {
                        await swalWithBootstrapButtons.fire({
                            title: "Advertencia",
                            text: resultado || "Hubo un problema con el proceso.",
                            icon: "warning"
                        });
                        resolve(false);
                    }
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                await swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: textoRechazado,
                    icon: "error"
                });
                resolve(false);
            }
        } catch (error) {
            await swalWithBootstrapButtons.fire({
                title: "Error",
                text: `Se produjo un error: ${error.message}`,
                icon: "error"
            });
            reject(error);
        }
    });
}