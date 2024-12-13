export class Usuario {
    constructor(codigo, nombre, apellido, email, telefono, direccion, ciudad, provincia, pais, nombreUsuario, password, esAdmin) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.provincia = provincia;
        this.pais = pais;
        this.nombreUsuario = nombreUsuario;
        this.password = password;
        this.esAdmin = esAdmin;
    }
}