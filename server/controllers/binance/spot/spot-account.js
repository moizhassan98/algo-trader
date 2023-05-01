const { spotBinance } = require('../helper/binance-spot-api')


const getSpotAccountBalances = async(apiKey, apiSecret) =>{
    // const apiKey = process.env.SpotTestnetAPIKey
    // const apiSecret = process.env.SpotTestnetSecretKey

    var result = await spotBinance(
        '/api/v3/account',
        'GET',
        apiKey,
        apiSecret,
        {
        }
    );
    
    return responseHandlerWithData(result,result.data.balances);
}

const getAccountBalanceForAsset = async(apiKey, apiSecret, asset) =>{
    var result = await spotBinance(
        '/sapi/v3/asset/getUserAsset',
        'POST',
        apiKey,
        apiSecret,
        {
            asset: asset
        }
    )

    return responseHandlerWithData(result, result.data[0]);
}




module.exports ={
    getSpotAccountBalances,
    getAccountBalanceForAsset,
}

function responseHandler(result){
    if(result.status === 200 ){
        return ({
            status: 200,
            success: true,
            result: result.data
        })
    }
    else{
        return ({
            status: result.response.status,
            success: false,
            error: result.response.statusText,
            data: result.response.data ? result.response.data : "no data",
        })
    }
}

/**
 * This function takes care of the response of the function after binance API Calls. It basically takes two inputs, `result` and `datafield`.
 * It is basically used when you want only a specific subset of data from the API result and not who API response from Binance.
 * 
 * @param {object} result response of the API Call
 * @param {object} datafield Data that you want returned inside the Response.
 * @returns 
 */
function responseHandlerWithData(result,datafield){
    if(result.status === 200 ){
        return ({
            status: 200,
            success: true,
            result: datafield
        })
    }
    else{
        return ({
            status: result.response.status,
            success: false,
            error: result.response.statusText,
            data: result.response.data ? result.response.data : "no data",
        })
    }
}