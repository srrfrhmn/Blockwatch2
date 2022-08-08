import axios from 'axios'

const API_URL = '/api/coins/coinlist'
const GET_COIN = '/api/coins/getCoin'


// Create add new coin to watchlist

const addCoin = async (coinData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    //console.log(config)
    const response = await axios.post(API_URL, coinData, config)
    console.log("adding coin service thing done")
    console.log(response.data)
    return response.data

}

// get coin data from coingecko

const getCoin = async (coinData, token) => {
    // console.log("sending coin data to getCoin")
    const response = await axios.post(GET_COIN, {
        coin: coinData
    })
    console.log("response from getCoin")
    console.log(response.data)
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
    getCoin,
    getCoins,
    delCoin
}

export default coinService;