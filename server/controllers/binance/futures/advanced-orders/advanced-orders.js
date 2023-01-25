const order = require('../futures-account')


const closeFuturesOrder = async({orderId,symbol}) =>{ //possibly in advanced orders.

    var orderQuery = await order.getFuturesOrderStatus({orderId, symbol});
    // console.log(orderQuery)
    if(orderQuery.status === 200){
        var orderSide = ""
        if(orderQuery.result.side === "BUY"){
            orderSide = "SELL"; 
        }
        else{
            orderSide = "BUY";
        }
        const orderCreationOptions = {
            symbol: orderQuery.result.symbol,
            quantity: parseFloat(orderQuery.result.executedQty),
            type: "MARKET",
            side: orderSide
        }

        var closeOrderQuery = await createFuturesOrder(orderCreationOptions);
        if(closeOrderQuery.status === 200){
            return ({
                status: 200,
                success: true,
                result: closeOrderQuery.result
            })
        }
        else{
            return ({
                status: 500,
                success: false,
                error: orderQuery.error,
                data: orderQuery.data
            })
        }
    }
    else{
        return ({
            status: 500,
            success: false,
            error: orderQuery.error,
            data: orderQuery.data
        })
    }

    
}


module.exports = {
    closeFuturesOrder,
}