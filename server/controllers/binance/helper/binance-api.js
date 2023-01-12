const axios = require('axios');
const crypto = require('crypto');

const binance = async(url, method , apiKey, apiSecret, options) =>{
    const timestamp = Date.now();
    var queryString = ""
    for(let prop in options){
        queryString += `${prop}=${options[prop]}&`
    }
    queryString += `timestamp=${timestamp}`
    const signature = crypto.createHmac('sha256', apiSecret).update(queryString).digest('hex');
    const data = queryString + `&signature=${signature}`

    const headers = {
        'X-MBX-APIKEY': apiKey,
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const axiosOptions = {
        url: url,
        method: method,
        data: data,
        headers: headers
    }

    axios(axiosOptions)
    .then((response)=>{
        console.log("API res:",response)
        return response
    })
    .catch((error)=>{
        console.log("API Error: ",error)
        return error
    })
    
}

module.exports = {
    binance,
}