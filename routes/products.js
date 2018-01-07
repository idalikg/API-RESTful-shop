const express = require('express');

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
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        nombre : req.body.nombre,
        precio : req.body.precio
    });

    res.save().then(result => {
        console.log(result);
    }).cath(err => console.log(err));

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