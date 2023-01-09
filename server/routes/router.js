const express = require('express')
const router = express.Router()

const TV_webhookRecieverCtrl = require('../controllers/tradingview/webhookReciever')

router.get('/test', TV_webhookRecieverCtrl.recieveTest)

module.exports = router