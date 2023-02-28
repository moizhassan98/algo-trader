const express = require('express')
const router = express.Router()

const CreateBrokerPage = require('../controllers/frontend/createBrokerPage')
const CreateBotPage = require('../controllers/frontend/createBotPage')

router.post('/apipermission', CreateBrokerPage.apiPermission)
router.post('/saveapi',CreateBrokerPage.saveApiInfo)

router.get('/userbrokers', CreateBotPage.getBrokersForUser)

module.exports = router