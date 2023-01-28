const axios = require('axios')

const getAssetMarkPrice = async(symbol) =>{
    return axios
        .get(`https://fapi.binance.com/fapi/v1/premiumIndex?symbol=${symbol}`)
        .then((response)=>{
            var markPrice = Number(response.data.markPrice);
            return markPrice;
        })
        .catch((error) =>{
            console.log(error);
            return -1;
        })
}

module.exports = {
    getAssetMarkPrice
}