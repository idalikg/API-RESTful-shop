const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Declaración del objeto que almacenará el esquema crear
const productSchema = {
    _id : mongoose.Schema.Types.ObjectId,
    nombre : String,
    precio : Number
};

// conversión y exportación del esquema
module.exports = mongoose.model('Product',  productSchema);