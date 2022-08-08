const asyncHandler = require("express-async-handler");
const axios = require("axios");
const CMC = require("../api_references/api_strings").CMC
const CGO = require("../api_references/api_strings").CGO

const Coin = require("../models/coinWatchModel");
const User = require("../models/userModel");


// const CoinList = require("../models/coinModel");
const getCoinByID = async (id) => {
    try {
        const data = await axios.get(CGO.BASE_URL + CGO.COINS + id + CGO.COINS_PARAM);
        return data.data;
    } catch (error) {
        return error;
    }
};

//@desc Get coin data with coin passed in as req.params.id
//@route GET /api/coins/getCoin/:id
//@access Private
const getCoin = asyncHandler(async (req, res) => {
    // const data = req.body.coin;
    const data = await getCoinByID(req.body.coin);
    res.status(200).json(data);
});

//@desc Get top 10 coins by market cap
//@route GET /api/coins/getTop10
//@access Private
const getTop10 = asyncHandler(async (req, res) => {
    try {
        const data = await axios.get(CGO.TOPTEN);
        res.status(200).json(data.data);
    } catch (error) {
        console.error(error);
    }
});

// WATCH LIST ROUTES

const getCoins = asyncHandler(async (req, res) => {
    const coins = await Coin.find({ user: req.user.id });
    res.status(200).json(coins);
});
    

const addCoin = asyncHandler(async (req, res) => {
    if(!req.body.coin) {
        return res.status(400).json({
            success: false,
            error: "You must provide a coin"
        });
    }

    const coin = await Coin.create({
        coin: req.body.coin,
        user: req.user.id
    });

    res.status(200).json(coin);
});

const deleteCoin = asyncHandler(async (req, res) => {
    if(!req.body.coin) {
        return res.status(400).json({
            success: false,
            error: "You must provide a coin"
        });
    }

    let coin;
    //console.log("cc",coin);
    try {
        coin = await Coin.findOne({ coin: req.body.coin, user: req.user.id });
        if(!coin) {
            return res.status(400).json({
                success: false,
                error: "Coin not found"
            });
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            error: "Coin not found"
        });
    }

    if(!req.user){
        res.status(401).json({
            success: false,
            error: "User not found"
        });
    } 

    if(coin.user.toString() !== req.user.id){
        res.status(401).json({
            success: false,
            error: "User not authorized"
        });
    }
    
    const deletedCoin = await coin.remove();

    res.status(200).json({ deleteCoin: deletedCoin });
});


module.exports = {
    getCoin,
    getTop10,
    getCoins,
    addCoin,
    deleteCoin
}