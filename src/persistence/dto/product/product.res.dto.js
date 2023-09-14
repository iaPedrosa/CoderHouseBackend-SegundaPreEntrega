export default class ProductResDTO {
    constructor(product) {
        this.name = product.title;
        this.price = product.price;
        this.disponibilidad = product.stock;

    }
}

