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

routeProduct.post('/:productID', (req, res, next) => {
    const productID = req.params.productID;
    res.status(200).send({
        message: `Product was found ${productID}`
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