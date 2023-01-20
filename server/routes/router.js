const express = require('express')
const router = express.Router()

const TV_webhookRecieverCtrl = require('../controllers/tradingview/webhookReciever')
const Binance_marginCtrl = require('../controllers/binance/margin/margin-ctrl')
const Binance_spotCtrl = require('../controllers/binance/spot/spot-ctrl')
const Binance_futuresCtrl = require('../controllers/binance/futures/futures-ctrl')

router.get('/test', TV_webhookRecieverCtrl.recieveTest)

//Binance
    //Margin
    router.post('/binance/marginorder', Binance_marginCtrl.createMarginOrder)

    //Spot
    router.post('/binance/spotorder',Binance_spotCtrl.createSpotOrder)
    router.get('/binance/spotorder', Binance_spotCtrl.getSpotOrderStatus)
    router.get('/binance/getallopenspotorders', Binance_spotCtrl.getAllSpotOrders)
    router.delete('/binance/spotorder',Binance_spotCtrl.cancelSpotOrder)
    router.delete('/binance/spotorders', Binance_spotCtrl.cancelAllSpotOrders)
    router.get('/binance/accountinfo',Binance_spotCtrl.getAccountInfo)

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

module.exports = router