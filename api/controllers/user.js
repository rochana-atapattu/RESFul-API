const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {


    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        else {
            const newuser = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash
            });
            newuser.save()
                .then(result => {
                    console.log(result);
                    res.status(200)
                        .json({
                            message: 'Usesr created'
                        })
                })
                .catch(err => {
                    res.status(500)
                        .json({
                            message: err
                        });
                });
        }
    });


};
exports.login = (req, res, next) => {
    User.find({username: req.body.username})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    //when login successful a new token is created with username, id, secret key is an environment variable and the token is valid for 1 hour
                    const token = jwt.sign({
                            name: user[0].username,
                            _id: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        });
                    console.log(user[0].username + " " + user[0]._id);
                    return res.status(200).json({
                        message: 'Auth success',
                        //token is sent with the response so that user can use it to validate
                        token: token
                    });
                }
                return res.status(401).json({
                    message: 'Auth failed'
                });
            })
        })
};