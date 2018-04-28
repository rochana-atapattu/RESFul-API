const express=require('express');
const app=express();
const morgan=require('morgan');
//we can use this to parse the body of incoming req. Supports JSON data
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test',function (err){
    if(err){
        console.log(err);
        process.exit(-1);
        //end the process if the connection is not successful
    }
    console.log("Connected to DB ")
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
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
const productRoute=require('./api/routes/products');
//no matter the http verb we want any http request that has /product to be directed here.
//anything starting with /products will be directed to productRoute
app.use('/products',productRoute);

app.use((req,res,next)=>{
    const error=new Error('Not Found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
});

module.exports = app;