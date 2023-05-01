const axios = require('axios');
const crypto = require('crypto');

const spotBinance = async(url, method , apiKey, apiSecret, options) =>{
    var baseUrl = 'https://api.binance.com'

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

    var axiosOptions = {}

    if(method.toLowerCase() === 'post' || method.toLowerCase() === 'put'){
        axiosOptions = {
            url: baseUrl + url,
            method: method,
            data: data,
            headers: headers
        }
    }
    else{
        axiosOptions = {
            url: baseUrl + url+'?'+data,
            method: method,
            headers: headers
        }
    }
    var ApiResponse = {}; 
    try {
        ApiResponse = await axios(axiosOptions);
    } catch (error) {
        ApiResponse = error
    }

    return ApiResponse;
    
}

module.exports = {
    spotBinance,
}