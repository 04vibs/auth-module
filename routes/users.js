const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const _ = require('lodash');

router.get('/',(req,res)=>{
    res.send('Hello world');
})

router.post('/',(req,res)=>{
    console.log('Inside post users');
  let  user = new User(_.pick(req.body, ['name', 'email', 'password']));
   console.log(_.pick(req.body, ['name', 'email', 'password']))
    
    fuser =  User.findOne({ email: req.body.email })
    
    if(!fuser){
    return res.status(400).send('User already registered.');
   }else{
       user.save();
       return res.send(user);
   }
})

module.exports = router;