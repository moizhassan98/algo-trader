const express = require('express')
const router = express.Router()

const TV_webhookRecieverCtrl = require('../controllers/tradingview/webhook-receiver')
const Binance_spotCtrl = require('../controllers/binance/spot/spot-ctrl')
const Binance_futuresCtrl = require('../controllers/binance/futures/futures-ctrl')
const Binance_futuresAdvancedCtrl = require('../controllers/binance/futures/advanced-orders/advanced-orders-ctrl')

router.post('/tv', TV_webhookRecieverCtrl.recieveTest)

//Binance

    //Spot

    router.get('/binance/spotbalances', Binance_spotCtrl.getSpotAccountAssets)

    //Futures
    router.post('/binance/futuresorder', Binance_futuresCtrl.createFuturesOrder)
    router.get('/binance/futuresorder', Binance_futuresCtrl.getFuturesOrderStatus)
    router.post('/binance/closefuturesorder',Binance_futuresCtrl.closeFuturesOrder)
    router.get('/binance/allfuturesorders', Binance_futuresCtrl.getAllFuturesOrders)
    router.delete('/binance/futuresorder', Binance_futuresCtrl.cancelFuturesOrder)
    router.delete('/binance/cancelallfuturesorders', Binance_futuresCtrl.cancelAllFuturesOrders)

    router.get('/binance/futuresbalance', Binance_futuresCtrl.getFuturesAccountBalance)
    router.get('/binance/futuresaccountinfo', Binance_futuresCtrl.getFuturesAccountInformation)

    router.post('/binance/changefuturesleverage',Binance_futuresCtrl.changeFuturesLeverage)
    router.post('/binance/changefuturesmargintype', Binance_futuresCtrl.changeFuturesMarginType)

    router.post('/binance/fixeddollarfutures', Binance_futuresAdvancedCtrl.createFixedDollarOrder)
    router.post('/binance/percentagefutures', Binance_futuresAdvancedCtrl.createPercentageOrder)
    router.post('/binance/closeallfutures', Binance_futuresAdvancedCtrl.closeAllOrdersForSymbol)

module.exports = router