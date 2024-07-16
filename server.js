const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {config} = require('dotenv');
config();

const app = express ();

const mongodb_url = process.env.mongodb_url;
app.use(express.json());
app.use(bodyParser.urlencoded({extended : false}));


mongoose.connect(mongodb_url)
.then(() => {
    app.listen(3000);
    console.log("dataBaase connected");
})
.catch(err => {
    console.log("Error in connecting dataBase")
})