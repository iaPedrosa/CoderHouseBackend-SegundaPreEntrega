export default class UserResDTO {
    constructor(user) {
        this.id = user._id;
        this.nombre = user.first_name;
        this.apellido = user.last_name;
        this.email = user.email;
        this.rol = user.role;

    }
}

