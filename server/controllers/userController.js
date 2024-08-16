const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { get } = require('mongoose');

const createToken = (_id) => {
    const jwtKey = process.env.JWT_KEY;
    return jwt.sign({_id}, jwtKey, {expiresIn: '3d'});
};

// Register a new user

const registerUser = async (req, res) => {
    // Get user input
    const {name, email, password} = req.body;

    try {
        // Validate user input
        if (!name || !email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }

        let user = await userModel.findOne({email});
        if (user) {
            return res.status(400).json({message: 'User already exists'});
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({message: 'Invalid email'});
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({message: 'Password is not strong enough'});
        }

        // Create a new user and save to database

        user = new userModel({name, email, password});
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const token = createToken(user._id);
        res.status(200).json({_id: user._id, name: user.name, email: user.email, userToken: token, message: 'Registration successful'});
    }catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    };
};

// Login a registered user
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        };

        let user = await userModel.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'Invalid credentials'});
        };

        let isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        };
    
        const token = createToken(user._id);
        res.status(200).json({_id: user._id, name: user.name, email: user.email, userToken: token, message: 'Login successful'});
    }catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        };
        res.status(200).json(user);
    }catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    };
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    }catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    };
};

module.exports = { registerUser, loginUser, getUser, getAllUsers };