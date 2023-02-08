
const account = require('./spot-account')

const getSpotAccountAssets = async(req,res) =>{

    var binanceQuery = await account.getSpotAccountBalances();

    responseHandler(binanceQuery, res);
}

module.exports = {
    getSpotAccountAssets,
}

function responseHandler(binanceQuery,res){
    if(binanceQuery.status === 200){
        return res.status(200).json({
            success: true,
            result: binanceQuery.result
        })
    }
    else{
        return res.status(binanceQuery.status).json({
            success: false,
            error: binanceQuery.error,
            data: binanceQuery.data
        })
    }
}
