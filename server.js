const express = require("express")
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const app = express();

const PORT = process.env.PORT || 3000;

mongoose
    .connect('mongodb://localhost:27017/SocialNetworkDB')
    .then(() => {
        console.log('Connected to the Database successfully');
    });

app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', routes);
app.listen(PORT, () => {
    console.log('Server is listening on Port:', PORT)
})
