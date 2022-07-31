const express = require("express");
const {getCoin, getTop10, getCoins, addCoin, deleteCoin} = require("../index_controllers/coinController");
const { protect } = require("../index_middleware/authMiddleware");

const router = express.Router();

router.route
router.route("/getCoin").get(getCoin);
router.route("/getTop10").get(getTop10);
router.route("/coinlist").get(protect, getCoins).post(protect, addCoin).delete(protect, deleteCoin);



module.exports = (router);