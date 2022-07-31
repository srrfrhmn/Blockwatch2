const mongoose = require('mongoose');
const { CMC } = require('../api_references/api_strings');


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },

    password:{
        type: String,
        required: [true, 'Please add a password'],
    },

    firstName:{
        type: String,
        required: [true, 'Please add a first name']
    },

    lastName:{
        type: String,
        required: [true, 'Please add a last name']
    }
});


module.exports = mongoose.model('User', userSchema);
