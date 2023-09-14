export default class ProductDTO {
    constructor(product) {
      this.title = product.name
      this.category = product.category
      this.description = product.description
      this.price = product.price
      this.stock = product.stock
    }
}