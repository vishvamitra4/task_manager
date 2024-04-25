const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    }

}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;