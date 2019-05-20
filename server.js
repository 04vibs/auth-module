const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./routes/users')
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users',users);

mongoose.connect('mongodb://localhost/authentication')
    .then(()=>console.log('connected to mongob..'))
    .catch(()=>console.log('could not connect to Mongoddb..',err));


app.listen(3000,()=>{
    console.log('server started listening to port 3000')
})