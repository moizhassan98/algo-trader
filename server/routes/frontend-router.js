const express = require('express')
const router = express.Router()

const CreateBrokerPage = require('../controllers/frontend/createBrokerPage')

router.post('/apipermission', CreateBrokerPage.apiPermission)
router.post('/saveapi',CreateBrokerPage.saveApiInfo)

module.exports = router