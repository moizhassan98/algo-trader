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

    var axiosOptions = {}

    if(method.toLowerCase() === 'post' || method.toLowerCase() === 'put'){
        axiosOptions = {
            url: url,
            method: method,
            data: data,
            headers: headers
        }
    }
    else{
        axiosOptions = {
            url: url+'?'+data,
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
    binance,
}