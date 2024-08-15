const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 6800;
const uri = process.env.ATLAS_URI;


app.listen(port, (req, res) => {
    console.log(`Server is running on port... ${port}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to the MERN Stack App');
});

mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true }).then(() => {
    console.log('MongoDB database connection established successfully');
    }).catch((error) => {
        console.log("MongoDB connection failed: " + error.message);
    });