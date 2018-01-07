const express = require('express');
const mongoose = require('mongoose');

const routeProduct = express.Router();

// MODELS
const Product = require('../models/product');

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
    
    // Instancia de un nuevo producto dentro del objeto constaructor del modelo
    const producto = new Product({
        _id: new mongoose.Types.ObjectId(),
        nombre: req.body.nombre,
        precio: req.body.precio
    });

    producto.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));

    res.status(201).json({
        message: "Product saved ",
        "Nuevo_producto" : product
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