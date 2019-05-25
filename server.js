const config = require('config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users',users);
app.use('/api/auth', auth);

// if(!config.get('jwtPrivateKey')){
//     console.log(config)
//     console.error('FATAL ERROR: jwtPrivateKey is not defined.');
//     process.exit(1);
// }

mongoose.connect('mongodb://localhost/authentication')
    .then(()=>console.log('connected to mongob..'))
    .catch(()=>console.log('could not connect to Mongoddb..',err));


app.listen(3000,()=>{
    console.log('server started listening to port 3000')
})