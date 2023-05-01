const axios = require('axios')

const getSpotAssetMarkPrice = async(symbol) =>{
    return axios
        .get(`https://api.binance.com/api/v3/avgPrice?symbol=${symbol}USDT`)
        .then((response)=>{
            var markPrice = Number(response.data.price);
            return markPrice;
        })
        .catch((error) =>{
            console.log(error);
            return -1;
        })
}

module.exports = {
    getSpotAssetMarkPrice
}