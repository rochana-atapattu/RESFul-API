const jwt = require('jsonwebtoken');

module.exports=(req,res,next)=> {
    try {
        const token =req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        //decoded userdata is added to a variable userdata
        req.userData=decode;
        //if authenticated call the next middleware
        next();
    }
    catch (e) {
        return res.status(401).json({
            message:'Auth failed'
        })
    }
}