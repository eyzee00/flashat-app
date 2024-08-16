/* 
 * Description: This file is the entry point of the server. 
 * It connects to the MongoDB database and starts the server on the specified port.
 */


// Import required modules
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

// Import routes
const userRouter = require('./routes/userRoute');

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/users', userRouter);

// Set up the port and URI
const port = process.env.PORT || 6800;
const uri = process.env.ATLAS_URI;

// Start the server
app.listen(port, (req, res) => {
    console.log(`Server is running on port... ${port}`);
});

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the MERN Stack App');
});

// Connect to MongoDB database
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true }).then(() => {
    console.log('MongoDB database connection established successfully');
    }).catch((error) => {
        console.log("MongoDB connection failed: " + error.message);
    });