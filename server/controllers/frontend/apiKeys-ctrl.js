const db = require('../../db');
const { spotBinance } = require('../binance/helper/binance-spot-api');

const apiPermission = async (req,res) =>{
    const {apiKey, apiSecret} = req.body

    //TODO: Validation of user input
    var result = await spotBinance(
        '/sapi/v1/account/apiRestrictions',
        'GET',
        apiKey,
        apiSecret,
        {
        }
    );
    console.log(result)
    if(result.status === 200){
        return res.status(200).json({
            success: true,
            result: {
                spot: result.data.enableSpotAndMarginTrading,
                futures: result.data.enableFutures
            }
        })
    }
    else{
        return res.status(400).json({
            success: false
        })
    }
}

const saveApiInfo = async(req,res) =>{
    const {broker, apiKey, apiSecret} = req.body
    const {uid} = res.locals
    //TODO: Input Validation.
    try{
        await db.collection('users').doc(uid).collection('brokers').doc(broker).set({
            apiKey,
            apiSecret
        })
        return res.status(200).json({
            success: true
        })
    }
    catch(err){
        return res.status(500).json({
            success: false
        })
    }
}

module.exports = {
    apiPermission,
    saveApiInfo
}