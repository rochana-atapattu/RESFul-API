const express = require('express');
const app = express();
const morgan = require('morgan');
//we can use this to parse the body of incoming req. Supports JSON data
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://user:admin@cluster0-shard-00-00-stpg9.mongodb.net:27017,cluster0-shard-00-01-stpg9.mongodb.net:27017,cluster0-shard-00-02-stpg9.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', function (err) {
    if (err) {
        console.log(err);
        process.exit(-1);
        //end the process if the connection is not successful
    }
    console.log("Connected to DB ")
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS error handling
/*app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Origin','*');
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE');
    return res.status(200).json({});
    }
});*/

//import product routes
const productRoute = require('./api/routes/products');
//no matter the http verb we want any http request that has /product to be directed here.
//anything starting with /products will be directed to productRoute
app.use('/products', productRoute);

const orderRoute = require('./api/routes/orders');
app.use('/orders', orderRoute);

const userRoute = require('./api/routes/user');
app.use('/user', userRoute);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;