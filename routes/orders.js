const express = require('express');

const routeOrder = express.Router();

routeOrder.get('/', (req, res, next) => {
    res.status(201).send({
        message : 'List Orders'
    });
});

routeOrder.get('/:orderID', (req, res, next) => {
    res.status(200).send({
        message : 'Order was fetched'
    });
});

routeOrder.post('/', (req, res, next) => {
    const order = {
        productoId: req.body.productoId,
        cantidad: req.body.cantidad
    }
    res.status(200).json({
        message : 'Order was created',
        order
    });
});


routeOrder.delete('/:orderID', (req, res, next) => {
    res.status(200).send({
        message : 'Order was deleted'
    });
});

module.exports = routeOrder;