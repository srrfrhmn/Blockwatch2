import axios from 'axios'

const API_URL = '/api/coins/coinlist'

// Create add new coin to watchlist

const addCoin = async (coinData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(config)
    const response = await axios.post(API_URL, coinData, config)
    return response.data

}

// get all coins from watchlist

const getCoins = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.get(API_URL, config)
    return response.data
}

// delete coin from watchlist

const delCoin = async (xcoin, token) => {
    const response = await axios.delete(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            coin: xcoin
        }
    })
    return response.data
}

const coinService = {
    addCoin,
    getCoins,
    delCoin
}

export default coinService;