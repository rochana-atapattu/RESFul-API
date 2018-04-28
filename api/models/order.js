const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 1
    }

});
module.exports = mongoose.model('Order', orderSchema);