import { baseDeDatosUsuario } from "../base-datos/bd-usuarios.js";
import { Usuario } from "../clases/usuario.js";



// Inicializar la Base de Datos con el usuario con rol de admin:

export function inicializarBaseDatosUsuario() {
    const recuperarBaseDeDatos = JSON.parse(localStorage.getItem("baseDeDatosUsuario"));
    if (!recuperarBaseDeDatos || recuperarBaseDeDatos.length === 0) {
        const adminUsuario = new Usuario (
            1,
            "Admin",
            "Admin",
            "emmendieta12@gmail.com",
            2804238041,
            "Brown 274",
            "Trelew",
            "Chubut",
            "Argentina",
            "admin",
            "Admin1234",
            true
        );
        baseDeDatosUsuario.push(adminUsuario);
        localStorage.setItem("baseDeDatosUsuario", JSON.stringify(baseDeDatosUsuario));
        console.log("Usuario administrador creado al inicializar por primera vez la Base de Datos usuario!");
    } else {
        console.log("La Base de Datos usuario ya está inicializada, por lo que no se crea el usuario Administrador!");
    }
}

// Guardar un nuevo usuario:

export function altaUsuario(usuario) {
    if (verificarExistenciaUsuario(usuario) === false) {
        const maxCodigo = obtenerCodigoMax() + 1;
        const nuevoUsuario = new Usuario(
            usuario.codigo = maxCodigo,
            usuario.nombre,
            usuario.apellido,
            usuario.email,
            usuario.telefono,
            usuario.direccion,
            usuario.ciudad,
            usuario.provincia,
            usuario.pais,
            usuario.nombreUsuario.toLowerCase(),
            usuario.password,
            usuario.esAdmin
        );
    
        baseDeDatosUsuario.push(nuevoUsuario);
        console.log("Usuario agregado:", nuevoUsuario);
        console.log("Base de datos actualizada:", baseDeDatosUsuario);    
        localStorage.setItem("baseDeDatosUsuario", JSON.stringify(baseDeDatosUsuario));
    } else { alert("Error: El nombre de usuario que intenta crear ya existe o el email ya se encuentra registrado!"); }
}

// Verificar si existe un Usuario:

function verificarExistenciaUsuario (usuario) {
    const recuperarBaseDeDatos = JSON.parse(localStorage.getItem("baseDeDatosUsuario"));
    if (usuario.email === "" || usuario.email === NaN) {
        alert ("Error: Verifique el formato de Email ingresado!");
    } else {
        const regexUsuario = /^[a-zA-Z]+$/;
        if (usuario.nombreUsuario === "" || !regexUsuario.test(usuario.nombreUsuario)) {
            alert ("Por favor verifique el formato del Nombre de Usuario!");
        } else {
            const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/;
            if (usuario.password === "" || !regexPassword.test(usuario.password)) {
                alert ("Por favor verifique el formato del Password");
            } else {
                if (usuario.nombreUsuario === "admin") {
                    alert("Error: No se puede crear un usuario con los provilegios de Administrador!");
                } else {
                    const verificaNombre = recuperarBaseDeDatos.some((elemento) => elemento.nombreUsuario === usuario.nombreUsuario);
                    const verificaEmail = recuperarBaseDeDatos.some((elemento) => elemento.email === usuario.email);
                    if (verificaNombre === true || verificaEmail === true) { return true; }
                    else {return false;}
                }
            }
        }
    }    
}

// Obtener el codigo Maximo:

function obtenerCodigoMax () {
    const recuperarBaseDeDatos = JSON.parse(localStorage.getItem("baseDeDatosUsuario"));
    if (recuperarBaseDeDatos.length !== 0) { 
        const baseDeDatosOrdenadaInversamente = recuperarBaseDeDatos.sort((elementoA, elementoB) => elementoB.codigo - elementoA.codigo);
        return baseDeDatosOrdenadaInversamente[0].codigo;
    }
    else { alert("Error: No se pudo recuperar la información de la Base de Datos!"); }
}

// Recupera el Usuario deseado:

export function recuperarUsuarioDeBD(usuario, password) {
    const recuperarBaseDeDatos = JSON.parse(localStorage.getItem("baseDeDatosUsuario"));
    if (recuperarBaseDeDatos.length === 0) { return false; }
    else {
        const usuarioEncontrado = recuperarBaseDeDatos.find((elemento) => elemento.nombreUsuario === usuario.toLowerCase());
        if (usuarioEncontrado !== undefined) {
            if (usuarioEncontrado.nombreUsuario === usuario.toLowerCase() && usuarioEncontrado.password === password) { return true; }
            else { return false; }
        } else { return false; }
    }
}


