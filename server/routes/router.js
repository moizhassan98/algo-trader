const express = require('express')
const router = express.Router()

const TV_webhookRecieverCtrl = require('../controllers/tradingview/webhookReciever')
const Binance_marginCtrl = require('../controllers/binance/margin/margin-ctrl')
const Binance_spotCtrl = require('../controllers/binance/spot/spot-ctrl')

router.get('/test', TV_webhookRecieverCtrl.recieveTest)

//Binance
    //Margin
    router.post('/binance/marginorder', Binance_marginCtrl.createMarginOrder)

    //Spot
    router.post('/binance/spotorder',Binance_spotCtrl.createSpotOrder)


module.exports = router