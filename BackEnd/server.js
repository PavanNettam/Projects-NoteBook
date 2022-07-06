require('dotenv').config()
const projectrouts = require('./routes/projects')
const mongoose = require('mongoose');

const express = require('express');


const app = express()

//middleware 
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})
app.use('/api/projects',projectrouts);

//connecting to data base
mongoose.connect(process.env.MONGO_URI).then(()=>{
    // listening to requests
    app.listen(process.env.PORT,()=>{
        console.log("Connected to db and Listening to Port: ",process.env.PORT);
    })
}).catch((err)=>{
    console.log(err);
})  

