const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const router = express.Router();
const {User} = require('../models/user');
const _ = require('lodash');

router.get('/',async(req,res)=>{
    
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');
    
    return res.status(200).send(_.pick(user,['_id','name','email']));;
    
    })

router.post('/',async(req,res)=>{

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');
       
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
        
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
        
    await user.save();
    return res.send(_.pick(user,['_id','name','email']));

});

function validate(req) {
    const schema = {
        name: Joi.string().min(5).max(255).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
}
module.exports = router;