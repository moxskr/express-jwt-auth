const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cookie = require('cookies');
const router = express.Router();
const User = require('../model/User');
const validateLogin = require('../validation/login');
const validateRegister = require('../validation/register');

router.post("/register", (req, res) => {
    const {login, email, password, passwordConfirm} = req.body;

    const {isValid, errors} = validateRegister({login,  email, password, passwordConfirm});

    if(!isValid){
        res.status(400).json({
            success : false,
            errors
        })
    }
    else{
        User.findOne({login}).then((user) => {
            if (user){
                res.status(400).json({
                    success : false,
                    errors : {
                        login : 'This login is already in use'
                    }
                })
            }
            else{
                const newUser = new User({
                    login, email, password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    if(err) console.error(err);
                    else{
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) console.error(err);
                            else{
                                newUser.password = hash;
                                newUser.save().then(() => res.status(200).json({
                                    success : true
                                }))
                            }
                        })
                    }
                })
            }
        })
    }
});

router.post('/login', (req, res) => {
    const {login , password} = req.body;
    const {errors, isValid} = validateLogin({login, password});

    if(!isValid){
        res.status(400).json({
            success : false,
            errors
        })
    }
    else{
        User.findOne({login}).then(user => {
            if(!user){
                res.status(400).json({
                    success : false,
                    errors : {
                        login : 'There is no such user'
                    }
                })
            }
            else{
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch){
                            jwt.sign({login}, 'secret', {expiresIn: 3600}, (err, token) => {
                                if(err) console.errors('There is some error in token', err);
                                else{
                                    let cookies = new Cookie(req, res);
                                    cookies.set('token', `Bearer ${token}`);
                                    res.status(200).json({
                                        success : true,
                                    })
                                }
                            })
                        }
                        else{
                            res.status(400).json({
                                success : false,
                                errors : {
                                    password : 'Password is invalid'
                                }
                            })
                        }
                    })
            }
        })
    }
});

module.exports = router;