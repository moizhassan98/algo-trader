const { binance } = require('../helper/binance-api')
const {
    changeFuturesMarginTypeSchema,
    changeFuturesLeverageSchema,
} = require('./utils/validators')

const changeFuturesMarginType = async(apiKey, apiSecret, options) =>{
    // const apiKey = process.env.FuturesTestnetApiKey
    // const apiSecret = process.env.FuturesTestnetApiSecret

    const {error} = changeFuturesMarginTypeSchema.validate(options);

    if(error){
        return ({
            status: 400,
            success: false,
            error: error
        })
    }
    else{
        var result = await binance(
            '/fapi/v1/marginType',
            'POST',
            apiKey,
            apiSecret,
            options
        );
    
        if(result.status === 200 ){
            return ({
                status: 200,
                result: result.data
            })
        }
        else{
            return ({
                status: 500,
                error: result.response.statusText,
                data: result.response.data ? result.response.data : "no data",
            })
        }
    }
}

const changeFuturesLeverage = async(apiKey,apiSecret, options) =>{
    // const apiKey = process.env.FuturesTestnetApiKey
    // const apiSecret = process.env.FuturesTestnetApiSecret

    const {error} = changeFuturesLeverageSchema.validate(options);

    if(error){
        return ({
            status: 400,
            success: false,
            error: error
        })
    }
    else{
        var result = await binance(
            '/fapi/v1/leverage',
            'POST',
            apiKey,
            apiSecret,
            options
        );
    
        if(result.status === 200 ){
            return ({
                status: 200,
                result: result.data
            })
        }
        else{
            return ({
                status: 500,
                error: result.response.statusText,
                data: result.response.data ? result.response.data : "no data",
            })
        }
    }
    
}

module.exports = {
    changeFuturesMarginType,
    changeFuturesLeverage,
}