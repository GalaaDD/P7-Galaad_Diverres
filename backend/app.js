const express = require("express");
const dotenv = require("dotenv").config();
const db = require("./config/db");
const app = express();
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commRoutes = require('./routes/comment');

const path =  require("path");
const helmet = require("helmet");
//const Ddos = require('ddos');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
    next();
})

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/', userRoutes);
app.use('/api/', postRoutes);
app.use('/api/', commRoutes);

module.exports = app;