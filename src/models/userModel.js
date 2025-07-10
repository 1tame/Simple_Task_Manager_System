const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true // adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('User', userSchema);
