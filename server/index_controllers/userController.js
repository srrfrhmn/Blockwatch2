const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

// @desc Register new user
// register user with firstname, lastname, email, password in request body
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // check if user entered all fields

    if(!firstName || !lastName || !email || !password) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    // check if user exists

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user 
    const user = await User.create({
        firstName,
        lastName,
        email, 
        password: hashedPassword
    });

    if (user){
        res.status(201).json({
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id)
    });
    } else {
        res.status(400)
        throw new Error("error creating user")
    }
    // res.status(200).json({
    //     message: 'Registering user'
    // });
});

// @desc Authenticate a user
// login with email and password in body of request
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    //check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,   
            token: generateToken(user._id)
        });
    } else {
        res.status(400)
        throw new Error("Invalid Credentials")
    }
    // res.status(200).json({
    //     message: 'Logging in user'
    // });
});

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async(req, res) => {
    res.status(200).json(req.user);
    // res.status(200).json({
    //     message: 'Getting user data'
    // });
});

// generate JWT 

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = { 
    registerUser,
    loginUser,
    getMe
};



