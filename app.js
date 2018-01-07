// MODULES
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const routeProduct = require('./routes/products');
const routeOrder = require('./routes/orders');

// INIT APP
const app = express();

// SETTINGS
app.set('nameAPI', 'API-REST shop');

// MIDDLEWARES
    // modules
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

    // routing
app.use('/products', routeProduct);
app.use('/orders', routeOrder);

    // handling error
app.use((req, res, next) => {
    const error = new Error('Page not found!!!');
    next(error);
});

app.use((error, req, res, next) => {
    res.status(404).send({
        "Error" : error.message
    });
});

module.exports = app;