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
            res.status(200).json(doc);
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
    const productoID = req.params.productID; // valor ID del producto a actualizar

    // objeto que vacío donde se almacenarán todos los atributos y los valores que posee el documento a actualizar, es decir, un producto
    const opcionesCambios = {};

    // iteración sobre los datos que serán parseados - es decir, capturados - demtro del cuerpo del documento
    for( const cambio of req.body ){

        /* Declaración de la estructura del arreglo donde serán recolectados todos los atributos y valores que tiene cada documento (es decir, un producto ) para llenar el objeto vacío 'opcionesCambios'*/

        opcionesCambios[cambio.atributo] = cambio.valor; 

        // cambio.atributo variable equivalente al nombre de cada atributo
        // cambio.valor variable equivalente al valor de cada atributo
    }

    // consulta y métodos para ejecutar la actualización de datos
    Product.update({ _id : productoID }, { $set: opcionesCambios } ).exec().then( actualizado => {
        console.log(actualizado);
        res.status(200).json(actualizado);
    }).catch( err => {
        console.log(err);
        res.status(500).json({
            ERROR : err
        });
    });

    // Ejemplo de como testear la petición del método PATCH en Postman
   /*  

        [
            {
                "atributo" : "nombre", "valor" : "samsung"
            }
        ]
        
    */

});

routeProduct.delete('/:productID', (req, res, next) => {
    const productoID = req.params.productID; // valor ID del producto a eliminar

    // consulta y metódos para eliminar un producto
    Product.remove({ _id : productoID }).exec().then( eliminado => {
            res.status(200).json({ message: `Elemento eliminado satisfactoriamente: ${productoID}`});
        }).catch( err => {
        res.status(500).json({
            ERROR : err
        });
    });

});

module.exports = routeProduct;