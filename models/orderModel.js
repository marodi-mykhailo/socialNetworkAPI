const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    customer: {
        type: mongoose.ObjectId,
        required: true
    },
    worker: {
        type: mongoose.ObjectId,
        required: true
    }
})

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;
