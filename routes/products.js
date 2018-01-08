const express = require('express');
const mongoose = require('mongoose');

const routeProduct = express.Router();

// MODELS
const Product = require('../models/product');

routeProduct.get('/', (req, res, next) => {
    
    // consulta y métodos para ejecutar búsqueda
    Product.find().exec().then( docs => {
        if(Product.length >= 0){ //si la longitud del objeto Product es mayoo a cero
            res.status(200).json(docs); // SI hay documentos (productos)
        } else { //si no
            res.status(500).json({ message : 'No hay productos' }); // NO hay documentos
        }
    }).catch( err => {
        ERROR : err
    });

});

routeProduct.get("/:productID", (req, res, next) => {
    const productoID = req.params.productID;

    var query = Product.findById(productoID);

    query.exec().then(doc=>{
        if (doc) {
            res.status(200).json({
                message: 'Producto Encontrado',
                doc
                });
            } else {
                res.status(404).json({message: 'Valor ID inválido'});
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({ERROR: err});
    });

});

routeProduct.post('/', (req, res, next) => {
    
    // Instancia de un nuevo producto dentro del objeto constaructor del modelo
    const producto = new Product({
        _id: new mongoose.Types.ObjectId(),
        nombre: req.body.nombre,
        precio: req.body.precio
    });

    producto.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Product saved ",
            "Nuevo_producto" : producto
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            Error : err
        });
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