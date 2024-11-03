import { baseDeDatosRepuestos } from "../base-datos/bd-repuestos.js";
import { Repuesto } from "../clases/repuesto.js";

// Funcion recuperardo la Base de Datos de los repuestos:

export function recuperarBDRepuestos() {
    let recuperarBaseDeDatosRepuesto = JSON.parse(localStorage.getItem("baseDeDatosRepuesto"));
    if (recuperarBaseDeDatosRepuesto === null || recuperarBaseDeDatosRepuesto.length === 0) {
        recuperarBaseDeDatosRepuesto = crearBDRepuestos();
        localStorage.setItem("baseDeDatosRepuesto", JSON.stringify(recuperarBaseDeDatosRepuesto));
        console.log("Base de Datos de Repuestos creada por primera vez correctamente!");
    } else {
        console.log("Base de Datos de Repuestos recuperada correctamente!");    
    }
}

// Funcion Crear Base de Datos Repuesto si no existe:

function crearBDRepuestos() {
    let nuevaBDRepuestos = [];
    const repuesto1 = new Repuesto(1, 10000000,"Retrovisores", 2011, "Astra", 123.55, 15, "https://http2.mlstatic.com/D_NQ_NP_707465-MLA75573563840_042024-O.webp");
    const repuesto2 = new Repuesto(2, 10000001, "Parabrisas", 2011, "Astra", 1000.00, 15, "https://http2.mlstatic.com/D_NQ_NP_814707-MLA75396323622_042024-O.webp");
    const repuesto3 = new Repuesto(3, 10000002, "Volante", 2011, "Astra", 750.99, 10, "https://http2.mlstatic.com/D_797387-MLA51898968943_102022-C.jpg");
    const repuesto4 = new Repuesto(4, 10000003, "Bujías x 4", 2011, "Astra", 250.55, 100, "https://http2.mlstatic.com/D_NQ_NP_960535-MLA31040323720_062019-O.webp");
    const repuesto5 = new Repuesto(5, 10000004, "Amortiguadores x 4", 2011, "Astra", 2500.55, 42, "https://http2.mlstatic.com/D_NQ_NP_607839-MLA78069070590_082024-O.webp");
    const repuesto6 = new Repuesto(6, 10000005, "Faro trasero conductor", 2011, "Astra", 450.55, 99, "https://http2.mlstatic.com/D_NQ_NP_622765-MLA70473923406_072023-O.webp");
    const repuesto7 = new Repuesto(7, 10000006, "Faro trasero acompañante", 2011, "Astra", 450.55, 99, "https://http2.mlstatic.com/D_NQ_NP_851015-MLA76872952329_062024-O.webp");
    const repuesto8 = new Repuesto(8, 10000007, "Puerta delantera acompañante", 2011, "Astra", 5000.75, 2, "https://http2.mlstatic.com/D_NQ_NP_2X_966711-MLA79026787319_092024-T.webp");
    nuevaBDRepuestos = [repuesto1, repuesto2, repuesto3, repuesto4, repuesto5, repuesto6, repuesto7, repuesto8];
    return nuevaBDRepuestos;
}

// Guardar un nuevo repuesto:

export function altaRepuesto(repuesto) {
    if (verificarExistenciaRepuesto(repuesto) === false) {
        const maxCodigo = obtenerCodigoMax() + 1;
        const nuevoRepuesto = new Repuesto(
            repuesto.codigo = maxCodigo,
            repuesto.codigoRepuesto,
            repuesto.nombre,
            repuesto.modelo,
            repuesto.vehiculo,
            repuesto.precio,
            repuesto.cantidad,
            repuesto.imagen
        );
        baseDeDatosRepuestos.push(nuevoRepuesto);
        console.log(`Repuesto Agregado:`, nuevoRepuesto);
        console.log("Base de datos actualizada: ", baseDeDatosRepuestos);
        localStorage.setItem("baseDeDatosRepuestos", JSON.stringify(baseDeDatosRepuestos));
        return true;
    } else { 
        alert("Error: El Repuesto que quiere crear ya existe!");
        return false;
    }
}

// Verificar Existencia de repuesto:

function verificarExistenciaRepuesto(repuesto) {
    const recuperarBaseDeDatosRepuesto = JSON.parse(localStorage.getItem("baseDeDatosRepuesto"));
    if (recuperarBaseDeDatosRepuesto.length === 0) {
        crearBDRepuestos();
    }
    if (repuesto.codigoRepuesto === NaN || repuesto.codigoRepuesto < 0) { alert ("Error: No se puedo leer correctamente el código del Repuesto!"); } else {
        if (repuesto.nombre === "" || repuesto.nombre === NaN) { alert ("Error: No se pudo leer correctamente el Nombre del Repuesto!"); }
        else {
            const verificarCodigoRepuesto = recuperarBaseDeDatosRepuesto.some((elemento) => elemento.codigoRepuesto === repuesto.codigoRepuesto);
            const verificarNombre = recuperarBaseDeDatosRepuesto.some((elemento) => elemento.nombre === repuesto.nombre);
            if (verificarCodigoRepuesto === true || verificarNombre === true) { return true; }
            else { return false; }
        }
    }
}

// Obtener el codigo Maximo:

function obtenerCodigoMax() {
    const recuperarBaseDeDatosRepuesto = JSON.parse(localStorage.getItem("baseDeDatosRepuesto"));
    if (recuperarBaseDeDatosRepuesto.length === 0) {
        crearBDRepuestos(); 
    }
    const recuperarBDInvertida = recuperarBaseDeDatosRepuesto.sort((elementoA, elementoB) => elementoB.codigo, elementoA.codigo);
    return recuperarBDInvertida[0].codigo;
}

// Devuelve lista de Repuestos:

export function listarRepuestos() {
    // Recuperar la base de datos de repuestos desde localStorage
    const recuperarBaseDeDatosRepuesto = JSON.parse(localStorage.getItem("baseDeDatosRepuesto"));
    
    // Verificar si la base de datos es null o no es un array
    if (!Array.isArray(recuperarBaseDeDatosRepuesto)) {
        return crearBDRepuestos(); // Si no existe o no es un array, crear la base de datos
    } else {
        return recuperarBaseDeDatosRepuesto; // Devolver la base de datos recuperada
    }
}

/* export function listarRepuestos() {
    const recuperarBaseDeDatosRepuesto = JSON.parse(localStorage.getItem("baseDeDatosRepuesto"));
    let devolverBDRepuesto = [];
    if (!recuperarBaseDeDatosRepuesto || recuperarBaseDeDatosRepuesto.length === 0) {
        devolverBDRepuesto = crearBDRepuestos();
        return devolverBDRepuesto;
    } else {
        devolverBDRepuesto = recuperarBaseDeDatosRepuesto;
        return devolverBDRepuesto;
    }
} */

// Devuelve una Lista de Repuesto pero filtandola con el Buscador:

export function listarRepuestosConFiltro(nombreBuscar) {
    const recuperarBaseDeDatosRepuesto = JSON.parse(localStorage.getItem("baseDeDatosRepuesto"));
    const listaRepuestosConFiltro = recuperarBaseDeDatosRepuesto.filter((repuesto) => repuesto.nombre.includes(nombreBuscar));
    return listaRepuestosConFiltro;
}

