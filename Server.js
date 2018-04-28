const http =require('http');
//import app.js
const app=require('./app');

const port=3000;
                                //passing app.js to create server since its an express app
const server= http.createServer(app);
console.log('Server listening on port 3000');


server.listen(port);