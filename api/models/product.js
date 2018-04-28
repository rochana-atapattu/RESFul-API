const mongoose = require('mongoose');

const prooductSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    product: {
        type: Number,
        required: true
    }

});
module.exports = mongoose.model('Product', prooductSchema);