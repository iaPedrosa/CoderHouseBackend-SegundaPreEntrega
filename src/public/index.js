
const socketClient = io();
const products = document.getElementById('products');

socketClient.on('productCreated', (array) => {
    let infoProducts = '<tr><th>ID</th><th>Title</th><th>Description</th><th>Code</th><th>Price</th><th>Stock</th><th>Category</th><th>Status</th></tr>';
    array.forEach((product) => {
        infoProducts += `<tr><td>${product._id}</td><td>${product.title}</td><td>${product.description}</td><td>${product.code}</td><td>${product.price}</td><td>${product.stock}</td><td>${product.category}</td><td>${product.status}</td></tr>`;
    });
    products.innerHTML = `<table id="products">${infoProducts}</table>`;
});

socketClient.on('productDeleted', (array) => {
    let infoProducts = '<tr><th>ID</th><th>Title</th><th>Description</th><th>Code</th><th>Price</th><th>Stock</th><th>Category</th><th>Status</th></tr>';
    array.forEach((product) => {
        infoProducts += `<tr><td>${product._id}</td><td>${product.title}</td><td>${product.description}</td><td>${product.code}</td><td>${product.price}</td><td>${product.stock}</td><td>${product.category}</td><td>${product.status}</td></tr>`;
    });
    products.innerHTML = `<table id="products">${infoProducts}</table>`;
}
);