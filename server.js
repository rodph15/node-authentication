const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT
    ,{ useNewUrlParser: true, useUnifiedTopology: true }
    , () =>{
    console.log('connected to db');
})

app.use(express.json());
app.set('trust proxy', true);
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('server up running'));