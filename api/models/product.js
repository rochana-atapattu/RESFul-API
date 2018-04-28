const mongoose=require('mongoose');

const prooductSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    product: Number

});
module.exports=mongoose.model('Product',prooductSchema);