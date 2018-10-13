const express= require('express');
const bodyparse= require('body-parser');
const cors= require('cors');

const {mongoose}= require('./db.js');
var articlecontroller = require ('./controllers/articleController.js');
var app =express();
app.use(bodyparse.json());
app.use (cors({origin:"http://localhost:4200"}));
app.listen(3000, ()=>console.log('Server started at port : 3000'));
app.use('/articles',articlecontroller);