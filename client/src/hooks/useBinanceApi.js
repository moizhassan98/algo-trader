import axios from 'axios'
import crypto from 'crypto'
import { BINANCE_URL } from '../config/urls'

/**
 * 
 * @param {string} url url of endpoint for binance e.g /fapi/getStatus
 * @param {string} method Http method like GET,POST,PUT, DELETE
 * @param {string} apiKey api key of the user. Used to request binance info
 * @param {string} apiSecret api secret 
 * @param {object} options the data to send in the request.
 * @returns Binance response
 */
const useBinanceApi = async(url, method , apiKey, apiSecret, options) =>{
    var baseUrl = BINANCE_URL
    // var baseUrl = 'https://testnet.binance.vision'

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
export default useBinanceApi