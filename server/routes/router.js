const express = require('express')
const router = express.Router()

const TV_webhookRecieverCtrl = require('../controllers/tradingview/webhookReciever')
const Binance_marginCtrl = require('../controllers/binance/margin/margin-ctrl')

router.get('/test', TV_webhookRecieverCtrl.recieveTest)

//Binance
router.post('/binance/marginorder', Binance_marginCtrl.createMarginOrder)

module.exports = router