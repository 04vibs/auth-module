const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const _ = require('lodash');

router.get('/',(req,res)=>{
    res.send('Hello world');
})

router.post('/',async(req,res)=>{

    let user = await User.findOne({ email: req.body.email });

    if (user) return res.status(400).send('User already registered.');
        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        await user.save();
        return res.send(user);

})

module.exports = router;