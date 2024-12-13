/* ---- HEADER ---- */

import { crearContenidoEnHeader } from "./elementos-html/header-html/header.js";

/* ---- MAIN ---- */

import { crearContenidoRepuestos} from "./elementos-html/main-html/repuestos-html.js";

/* ---- FOOTER ---- */
import { crearContenidoFooter } from "./elementos-html/footer-html/footer.js";

/* ---- INICIALIZAR ---- */

import { fetchUsuarios} from "./funciones/funciones-usuario.js";

crearContenidoEnHeader();

crearContenidoRepuestos();

crearContenidoFooter();

/* ----- INICIALIZANDO ----- */

fetchUsuarios();
