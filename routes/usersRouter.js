const express = require('express');
const usersRouter = express.Router();
const validate = require('express-validation');
const registerValidation = require('../validation/register');
const loginValidation = require('../validation/login');
const User = require('../models/userModel');


usersRouter
    // Get all users
    .get('/', (req, res)=>{
        User.find({}, (err, users)=>{
            if (err){
                return console.log(err);
            }
            res.status(200).send(users);
        })
    })
    .post('/login', validate(loginValidation), (req, res)=>{
        User.findOne({email: req.body.email, password: req.body.password}, (err, queryUser)=>{
            if (err) {
                return console.log(err);
            }
            if (queryUser){
                return res.status(200).send(queryUser);
            } else {
                let error = {
                        message: "Email or password is incorrect!"
                };
                return res.status(404).send(error);
            }
        })
    })
    // Register
    .post('/', validate(registerValidation), (req, res)=>{
        User.findOne({email: req.body.email}, (err, existUser)=>{
            if (err){
                return console.log(err);
            }
            if (existUser){
                let error = {
                    message: "Email already existed!"
                };
                return res.status(409).send(error);
            }
            const registerUser = new User({
                email: req.body.email,
                password: req.body.password,
                userName: req.body.userName
            });
            registerUser.save((err)=>{
                if (err) return console.log(err);
                res.status(201).send(registerUser);
                console.log("Add new User succeeded!");
            })
        })
    });

module.exports = usersRouter;