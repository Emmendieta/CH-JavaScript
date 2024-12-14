import { Repuesto } from "../../clases/repuesto.js";
import { listarRepuestos, procesoFiltrarRepuestos } from "../../funciones/funciones-repuesto.js";
import { alertSweetAlert2, errorSweetAlert2 } from "../../sweet-alert-2/funciones-sweet-alert-2.js";
import { crearContenidoCarritoEnMainBottom } from "./carrito-html.js";
import { mostrarModal } from "./modales-html/funciones-modal.js";
import { crearContenidoModalAgregarRepuestoCarrito } from "./modales-html/modal-agregar-repuesto-carrito.js";
import { crearContenidoModalRepuesto, desHabilitarCodigoRepuestoInput, deshabilitarInputsModalRepuesto } from "./modales-html/modal-repuesto.js";

export async function crearContenidoRepuestos() {
    crearContenidoRepuestoTop();
    await crearContenidoRepuestoBottom(1);
    crearContenidoCarritoEnMainBottom();
}

// Crea el Contenido superior donde se muestra el Titulo y un boton para agregar nuevos repuestos (siempre y cuando este logueado como admin):

function crearContenidoRepuestoTop() {
    const contenedorMainTop = document.getElementById('mnTop');
    //Verifico si tengo que eliminar y recargar:
    const contenidoRepuestosTop = document.querySelector('.mnSectRepuestosTop');
    if (contenidoRepuestosTop) { contenidoRepuestosTop.remove(); }
    const sectionTopConteiner = document.createElement('section');
    sectionTopConteiner.innerHTML = '';
    sectionTopConteiner.classList.add('mnSectRepuestosTop');
    //Contenido en la section Top del main:
    sectionTopConteiner.innerHTML = `
    <article>
        <h1 class="mnSectArtTitulo">Repuestos:</h1>
    </article>
    <article class="mnSectArtAdd">
        <button type="button" class="btn btn-success btnAddRepuesto" id="btnAddRepuesto">Agregar Repuesto</button>
    </article>
    `;
    contenedorMainTop.appendChild(sectionTopConteiner);
    const btnAddRepuesto = sectionTopConteiner.querySelector('#btnAddRepuesto');
    btnAddRepuesto.addEventListener('click', ()=> {
        const repuesto = new Repuesto(0, 0, "", 0,"", 0.00, 0, "");
        crearContenidoModalRepuesto(null, 1)
        const modalRepuesto = document.getElementById('modalRepuesto');
        mostrarModal(modalRepuesto);
    });
}

export async function crearContenidoRepuestoBottom(opcion) {
    try {
        const contenedorMainBottom = document.getElementById('mnBottom');
        contenedorMainBottom.innerHTML = '';
        //Verifico si tengo que eliminar y recargar:
        const contenidoRepuestosBottom = document.querySelector('mnSectRepuestosBottom');
        if (contenidoRepuestosBottom) { contenidoRepuestosBottom.remove(); }
        const sectionBottomConteiner = document.createElement('section');
        sectionBottomConteiner.innerHTML = '';
        sectionBottomConteiner.classList.add('mnSectRepuestosBottom');
        let lista;
        if (opcion === 1){ lista = await listarRepuestos(); }
        else if (opcion === 2) { 
            lista = await procesoFiltrarRepuestos(); 
            if (lista.length === 0) { 
                lista = await listarRepuestos(); 
                alertSweetAlert2("Error al buscar el Repuesto:", "No se encontró ningun repuesto con el valor ingresado, por favor verifique que este todo correcto!");         
            }
        }
        //Contenido en la section Bottom del main:
        lista.forEach((repuesto, indice) => {
            //Creo una tarjeta por cada Repuesto que hay en la BD:
            const tarjetaEnHTML = `
                <div class="card" style="width: 18rem;">
                    <div class="d-flex justify-content-center">
                        <img src="${repuesto.imagen} || images/imagen-no-disponible.png" class="card-img-top" id="imgRepuesto${indice}"
                        alt="imagen de Repuesto: ${repuesto.nombre}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title" id="nombreRepuesto${indice}">Nombre: ${repuesto.nombre}</h5>
                        <p class="card-text" id="codigoRepuesto${indice}">Código: ${repuesto.codigoRepuesto}</p>
                        <p class="card-text" id="vehiculoRepuesto${indice}">Vehículo: ${repuesto.vehiculo}</p>
                        <p class="card-text" id="modeloRepuesto${indice}">Modelo: ${repuesto.modelo}</p>
                        <p class="card-text" id="precioRepuesto${indice}">Precio $${repuesto.precio}</p>
                        <p class="card-text" id="cantidadRepuesto${indice}">Cantidad: ${repuesto.cantidad}</p>
                        <div class="card-body-botones">
                            <div class="card-boyd btnEdition">
                                <button class="btn btn-outline-success btnEditProducto" data-indice="${indice}"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="btn btn-outline-danger btnDeleteProducto" data-indice="${indice}"><i class="fa-regular fa-circle-xmark"></i></button>
                            </div>
                            <div class="card-body-btnAgregar">
                                <button class="btn btn-success btnAgregarProductoCarrito" data-indice="${indice}">Agregar al carrito</button>
                            </div>
                        </div>           
                    </div>
                </div>
            `;
            //Añado los Repuestos al HTML:
            contenedorMainBottom.insertAdjacentHTML('beforeend', tarjetaEnHTML);
            //En Caso de que haga click en el boton de editar un determinado Repuesto:
            const btnEditarRepuesto = contenedorMainBottom.querySelector(`.btnEditProducto[data-indice="${indice}"]`);
            const recuperandoRepuesto = new Repuesto(repuesto.codigo, repuesto.codigoRepuesto, repuesto.nombre, repuesto.modelo, repuesto.vehiculo, repuesto.precio, repuesto.cantidad, repuesto.imagen)
            //Evento si hago click en el boton editar:
            btnEditarRepuesto.addEventListener('click', () => {
                crearContenidoModalRepuesto(recuperandoRepuesto, 2);
                const modalRepuesto = document.getElementById('modalRepuesto');
                mostrarModal(modalRepuesto);
                desHabilitarCodigoRepuestoInput();
            });
            //En caso de que haga click en el boton de eliminar un determinado Repuesto:
            const btnEliminarRepuesto = contenedorMainBottom.querySelector(`.btnDeleteProducto[data-indice="${indice}"]`);
            //Evento si hago click en el boton eliminar:
            btnEliminarRepuesto.addEventListener('click', () => {
                crearContenidoModalRepuesto(recuperandoRepuesto, 3);
                const modalRepuesto = document.getElementById('modalRepuesto');
                mostrarModal(modalRepuesto);
                deshabilitarInputsModalRepuesto();
            });
            //En caso de que haga click en el boton de agregar al carrito un determinado Repuesto:
            const btnAgregarProductoCarrito = contenedorMainBottom.querySelector(`.btnAgregarProductoCarrito[data-indice="${indice}"]`);
            //Evento si hago click en el boton agregar a carrito:
            btnAgregarProductoCarrito.addEventListener('click', () => {
                //Cargo los valores del Repuesto Seleccionado en el Modal Agregar a Carrito:
            crearContenidoModalAgregarRepuestoCarrito(repuesto);
            const modalAgregarRepuestoCarrito = document.getElementById('modalAgregarRepuestoACarrito');
            mostrarModal(modalAgregarRepuestoCarrito);
            });
            deshabilitarBotonesAgregarEditarEliminarProducto();
            deshabilitarBotonesAgregarProductoACarrito();
        });
    } catch (error) { errorSweetAlert2("Error inesperado al cargar la lista de Repuestos. Error: " +  error); }
    finally {}
}

/* ---- FUNCIONES BOTONES ABM PRODUCTOS ---- */

// Funcion ocultar botones Modificar/Eliminar Productos: VER ESTE TAMBIEN!

export function habilitarBotonesAgregarEditarEliminarProducto() {
    const btnEditarProducto = document.querySelectorAll('.btnEditProducto');
    const btnDeleteProducto = document.querySelectorAll('.btnDeleteProducto');
    const nombreUsuarioLogueado = document.getElementById('pUserName');
    const btnAltaRepuesto = document.getElementById('btnAddRepuesto');
    const mnSectArtAdd = document.querySelector('.mnSectArtAdd');
    const adminText = "Usuario: admin";
    if (nombreUsuarioLogueado.innerText === adminText) {
        btnEditarProducto.forEach((boton) => {
            boton.disabled = false;
            boton.style.display = 'block';
        });
        btnDeleteProducto.forEach((boton) => {
            boton.disabled = false;
            boton.style.display = 'block';
        });
        mnSectArtAdd.style.display = 'flex';
        btnAltaRepuesto.disabled = false;
        btnAltaRepuesto.style.display = 'block';
    }
}

//Funcion para deshabilitar los botones de edicion/eliminacion de Repuestos:

export function deshabilitarBotonesAgregarEditarEliminarProducto() {
    try {
        const btnEditarProducto = document.querySelectorAll('.btnEditProducto');
        const btnDeleteProducto = document.querySelectorAll('.btnDeleteProducto');
        const nombreUsuarioLogueado = document.getElementById('pUserName');
        const btnAltaRepuesto = document.getElementById('btnAddRepuesto');
        const adminText = "Usuario: admin";
        if (nombreUsuarioLogueado.innerText !== adminText) {
            btnEditarProducto.forEach((boton) => {
                boton.disabled = true;
                boton.style.display = 'none';
            });
            btnDeleteProducto.forEach((boton) => {
                boton.disabled = true;
                boton.style.display = 'none';
            });
            btnAltaRepuesto.disabled = true;
            btnAltaRepuesto.style.display = 'none';
        }        
    } catch(error) { errorSweetAlert2 ("Error al deshabilitar los botones ABM de Productos. Error: " + error); }
    finally {}
}

/* ---- FUNCIONES BOTONES AGREGAR PRODUCTO A CARRITO ---- */

export function habilitarBotonesAgregarProductoACarrito() {
    const botonesAgregarCarrito = document.querySelectorAll('.btnAgregarProductoCarrito');
    botonesAgregarCarrito.forEach((boton) => {
        boton.disabled = false;
        boton.style.opacity = 1;
        boton.style.pointerEvents = 'auto';
    });
}

export function deshabilitarBotonesAgregarProductoACarrito() {
    const botonesAgregarCarrito = document.querySelectorAll('.btnAgregarProductoCarrito');
    botonesAgregarCarrito.forEach((boton) => {
        boton.disabled = true;
        boton.style.opacity = 0.5;
        boton.style.pointerEvents = 'none';
    });
}


