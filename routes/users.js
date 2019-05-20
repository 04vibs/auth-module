const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const _ = require('lodash');

router.get('/',(req,res)=>{
    res.send('Hello world');
})

router.post('/',(req,res)=>{
   user = new User(_.pick(req.body, ['name', 'email', 'password']));
   
    let user =  User.findOne({ email: req.body.email })
    res.send(user);
    // if (user) return res.status(400).send('User already registered.');
    //  user.save();
     res.send(user);
})

module.exports = router;