// MODULES
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const routeProduct = require('./routes/products');
const routeOrder = require('./routes/orders');

// Mongoose conection
mongoose.connect('mongodb://node-shop:' + proccess.env.MONGO_ATLAS_PWD +'@node-rest-shop-shard-00-00-umxws.mongodb.net:27017,node-rest-shop-shard-00-01-umxws.mongodb.net:27017,node-rest-shop-shard-00-02-umxws.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin', {
    useMongoClient : true
});

// INIT APP
const app = express();

// SETTINGS
app.set('nameAPI', 'API-REST shop');

// MIDDLEWARES
    // CORS -> Cross Origin Resourse Sharing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "POST, POST, DELETE, PATCH, GET");
        return res.status(200).json({});
    }
    next();
});

    // modules npm
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