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

routeOrder.post('/:orderID', (req, res, next) => {
    res.status(200).send({
        message : 'Order was created'
    });
});


routeOrder.delete('/:orderID', (req, res, next) => {
    res.status(200).send({
        message : 'Order was deleted'
    });
});

module.exports = routeOrder;