// const routes = require('express').Router();
// const { Producto, productos } = require('../constproductos');

const path = require('path');
const fs = require('fs');
const { Router } = require('express')
const routes = Router();
const Contenedor = require('../productos/Contenedor');
const productos = new Contenedor ('../productos/productos.json')

routes.get('/productos', async (req, res) => {
    let productos = await fs.promises.readFile(
        path.resolve(__dirname, '../productos/productos.json')
    );
    res.json(JSON.parse(productos));
});

// routes.get('/productos', (req, res) => {
//     res.json({ productos });
// })

routes.get('/productos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await productos.getById(id);
    res.json(producto)
});

// routes.get('/productos/:id', (req, res) => {
//     let producto = Producto.productos.find(
//         producto => producto.id === Number(req.params.id)
//     );
//     if (producto) {
//         res.send(producto);
//     } else {
//         res.status(404).send({
//             Error: 'Producto no encontrado'
//         });
//     }
// });

routes.post('/productos', async(req, res) => {
    const data = req.body;
    const newProducto = await productos.save(data);
    res.json(data);
});

// routes.post('/productos', (req, res) => {
//     let { title, price, thumbnail } = req.body;
//     const producto = { title, price, thumbnail };
//     producto.id = Producto.productos.length + 1;
//     Producto.productos.push(producto);
//     res.send(Producto.producto);
// })

routes.put('/productos/:id', (req, res) => {
    let { title, price, thumbnail } = req.body;
    let index = Producto.productos.findIndex(
        producto => producto.id === Number(req.params.id)
    );
    if (index >= 0) {
        Producto.productos[index] = { title, price, thumbnail };
        Producto.productos[index].id = Number(req.params.id);
        res.send(Producto.productos[index]);
    } else {
        res.status(404).send({
            error: 'Producto no encontrado'
        })
    }
});

routes.delete('/productos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await productos.getById(id);
    const deleteProducto = await productos.deleteById(id);
    res.json(producto);
})

// routes.delete('/productos/:id', (req, res) => {
//     let index = Producto.productos.findIndex(
//         producto => producto.id === Number(req.params.id)
//     );
//     if (index >= 0) {
//         Producto.productos.splice(index, 1);
//         res.send({mensaje: 'Producto eliminado'})
//     } else {
//         res.status(404).send({
//             error: 'Producto no encontrado'
//         });
//     } 
// });

module.exports = routes