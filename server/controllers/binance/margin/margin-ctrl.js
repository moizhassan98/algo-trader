const getBinanceConnector =  require('../binance-connector')
const {
    createMarginOrderSchema,
} = require('./validators')
const { Spot } = require('@binance/connector')

const createMarginOrder = async(req,res) =>{
    const {error} = createMarginOrderSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error
        });
    }
    else{
        const body = req.body
        var userId = body.userId;
        console.log("USER",userId)
        // var binanace = getBinanceConnector(userId);
        var binance = new Spot('L4UDWLVo5finHFXW3XgRJ2XQ2npLpTgIGxUSsjD9mBIhZfAEZFj61HsRbnEckfSF','SKlRJTg2WSsZuqev1nE4Mc52H8AN91u5NPSGMnrUtDoQ4eDGQH02RlphAOVHj22g')

        binance.newMarginOrder(
            body.symbol,
            body.side,
            body.type,
            {
                isIsolated: body.isIsolated,
                quantity: body.quantity,
            }
        )
        .then((ApiResponse)=>{
            console.log(ApiResponse);

            return res.status(200).json({
                response: ApiResponse,
            })

        })
        .catch((error)=>{
            console.log(error);
            return res.status(500).json({
                error: error,
            })
        })

        
    }
}



module.exports = {
    createMarginOrder,
}