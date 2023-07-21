const dotenv = require("dotenv");
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const uuid = require('uuid')
require("nodemailer");
const cors = require("cors");
app.use(cors());

const cookieParser = require("cookie-parser");
dotenv.config({path:'./config.env'});

require('./db/conn');

app.use(express.json());
app.use(cookieParser());
//router files
app.use(require('./router/auth'));
// const User = require('./model/userSchema');

//connection
const PORT = process.env.PORT;


app.get('/contact',(req,res)=>{
    res.send("Contact Us");
});
app.get('/signin',(req,res)=>{
    res.send("please login here!!");
});
app.get('/signup',(req,res)=>{
    res.send("please register here!!");
});



app.listen(PORT, () => {
    console.log(`server started at ${PORT} port`);
  });

