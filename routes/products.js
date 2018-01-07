const express = require('express');

const routeProduct = express.Router();

routeProduct.get('/', (req, res, next) => {
    res.status(200).send({
        message : 'List products'
    });
});

routeProduct.get('/:productID', (req, res, next) => {
    const productID = req.params.productID;
    res.status(201).send({
        message: `Product was fetched ${productID}`
    });
});

routeProduct.post('/', (req, res, next) => {
    const productID = req.params.productID;
    const product = {
        nombre: req.body.nombre,
        precio: req.body.precio
    }
    res.status(200).json({
        message: `Product was found ${productID}`,
        product
    });
});

routeProduct.patch('/:productID', (req, res, next) => {
    res.status(200).send({
        message : 'Product UPDATED'
    })
});

routeProduct.delete('/:productID', (req, res, next) => {
    res.status(200).send({
        message : 'Product was deleted'
    });
});

module.exports = routeProduct;