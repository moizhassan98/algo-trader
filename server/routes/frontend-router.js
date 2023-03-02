const express = require('express')
const router = express.Router()

const botCtrl = require('../controllers/frontend/bot-ctrl')
const apiCtrl = require('../controllers/frontend/apiKeys-ctrl')
const brokerCtrl = require('../controllers/frontend/broker-ctrl')
const userCtrl = require('../controllers/frontend/user-ctrl')

router.post('/createuser', userCtrl.createUser)
router.get('/userexists', userCtrl.userExists)

router.post('/apipermission', apiCtrl.apiPermission)
router.post('/saveapi',apiCtrl.saveApiInfo)

router.get('/userbrokers', brokerCtrl.getBrokersForUser)

router.post('/createbot',botCtrl.createBot)
router.get('/bot/:botId', botCtrl.getBotById)
router.get('/bots',botCtrl.getAllBots)

module.exports = router