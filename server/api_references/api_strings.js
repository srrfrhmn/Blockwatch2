const CMC = {
    BASE_URL : "https://pro-api.coinmarketcap.com/v1/cryptocurrency",
    QUOTES: "/quotes/latest",
    QSTRING : "?CMC_PRO_API_KEY=d0306f35-bd65-443a-8343-0c492ad70433&symbol="
};

const CGO = {
    BASE_URL : "https://api.coingecko.com/api/v3",
    COINS: "/coins/",
    COINS_PARAM : "?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false",
    TOPTEN : "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h%2C7d"
}

module.exports = {CMC, CGO};