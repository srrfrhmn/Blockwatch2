const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { modelName } = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // if the user has a token in the header, then we will use that token
    // if the user does not have a token in the header, then we will check the cookies
    // if the user does not have a token in the header or in the cookies, then we will return an error
    // if the user has a token in the header or in the cookies, then we will check if the token is valid
    // if the token is valid, then we will set the user to req.user
    // if the token is not valid, then we will return an error

    if( req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')) {
        try {

            // get token from header
            token = req.headers.authorization.split(' ')[1];

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //get user from token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    }

    if(!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

});

module.exports = { protect }