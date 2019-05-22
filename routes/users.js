const express = require('express');
const Joi = require('joi');
const router = express.Router();
const {User} = require('../models/user');
const _ = require('lodash');

router.get('/',async(req,res)=>{
    
    let user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(!user) return res.status(400).send('email Id or password does not match');
        return res.status(200).send(user)
})

router.post('/',async(req,res)=>{

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');
        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        await user.save();
        return res.send(user);

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