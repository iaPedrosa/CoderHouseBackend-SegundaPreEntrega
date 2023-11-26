export default class UserResDTOAdmin {
    constructor(user) {
        this.id = user._id;
        this.nombre = user.first_name;
        this.apellido = user.last_name;
        this.email = user.email;
        this.rol = user.role;
        this.identificacion = user.identificacion;
        this.direccion = user.direccion;
        this.estadoDeCuenta = user.estadoDeCuenta;
        this.profilepic = user.profilepic;
        this.documents = user.documents;

    }
}

