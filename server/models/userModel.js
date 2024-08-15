const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, minlength: 3, maxlength: 15}, 
        email: {type: String, required: true, minlength: 6, maxlength: 45, unique: true},
        password: {type: String, required: true, minlength: 6, maxlength: 1024},
    }, 
    {
        timestamps: true,
    }
);

const userModel = mongoose.Model("User", userSchema);
module.exports = userModel;